import express from "express"
import multer from "multer"
import fs from "fs"
import { promisify } from "util"
import { readFile, writeFile, readdir } from "fs"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

const createDirectory = directory => {
  return fs.mkdirSync(directory, { recursive: true })
}

const deleteFile = file => {
  return fs.unlinkSync(file)
}

const readFileAsync = promisify(readFile)
const readDirAsync = promisify(readdir)
const writeFileAsync = promisify(writeFile)

const extractFileName = file => {
  if (file.fieldname) {
    return file.fieldname
  }
  return file.slice(0, file.indexOf("."))
}

const extractFileType = file => {
  if (file.mimetype) {
    return file.mimetype.slice(file.mimetype.indexOf("/") + 1)
  }
  return file.slice(file.indexOf(".") + 1)
}

const UPLOAD_DIR = "public/uploads"

const acceptedFileTypes = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/x-icon"
]

const acceptedFileNames = ["logo", "banner"]

const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const { userId } = req
    const movieId = req.params.id

    const directory = `${UPLOAD_DIR}/${movieId}` // Using movieId instead of company._id
    createDirectory(directory)

    cb(null, directory)
  },
  filename: function (req, file, cb) {
    const extractedType = extractFileType(file)
    const fileName = `${file.fieldname}.${extractedType}`
    cb(null, fileName)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: async (req, file, cb) => {
    const { userId } = req
    const movieId = req.params.id

    if (!userId || !movieId) {
      console.log("image -> userId or movieId not set")
      cb(null, false)
      return
    }

    if (!acceptedFileTypes.includes(file.mimetype)) {
      console.log("image -> mimetype not accepted")
      cb(null, false)
      return
    }

    if (!acceptedFileNames.includes(file.fieldname)) {
      console.log("image -> fieldname not accepted")
      cb(null, false)
      return
    }

    const directory = `${UPLOAD_DIR}/${movieId}`

    createDirectory(directory)

    const movieImages = await readDirAsync(directory)

    const imageInDir = movieImages.find(img => {
      const extractedName = extractFileName(img)
      return extractedName.includes(file.fieldname)
    })

    if (imageInDir) {
      deleteFile(`${directory}/${imageInDir}`)
    }

    // Everything working well
    cb(null, true)
  }
})

const uploadSingle = upload.fields(
  acceptedFileNames.map(fileName => {
    return {
      name: fileName,
      maxCount: 1
    }
  })
)

router.get("/", async (req, res) => {
  try {
    const { imageName, movieId } = req.query

    if (
      !imageName ||
      (imageName && !imageName.length) ||
      !movieId ||
      (movieId && !movieId.length)
    ) {
      return res.status(400).send({
        success: false,
        message: "Missing required parameters"
      })
    }

    const directory = `${UPLOAD_DIR}/${movieId}`

    try {
      const movieImages = await readDirAsync(directory)
      const imageInDir = movieImages.find(img => {
        return img.includes(imageName)
      })

      if (!imageInDir) {
        return res.status(404).send({
          success: false,
          message: "IMAGE_NOT_FOUND"
        })
      }

      const extractedType = extractFileType(imageInDir)
      const imageDir = `${directory}/${imageInDir}`
      const readingFile = await readFileAsync(imageDir)

      res.header(
        "Content-Type",
        acceptedFileTypes.find(types => types.includes(extractedType))
      )
      return res.status(200).send(readingFile)
    } catch (err) {
      if (err.code === "ENOENT") {
        return res.status(404).send({
          success: false,
          message: "DIRECTORY_OR_FILE_NOT_FOUND"
        })
      }
      throw err
    }
  } catch (e) {
    console.error(e)
    res.status(500).send({
      success: false,
      message: "UNABLE_TO_PROCESS_INFORMATION"
    })
  }
})

router.post("/upload/:id", [authMiddleware, uploadSingle], async (req, res) => {
  try {
    // Return the urls for the uploaded images
    const movieId = req.params.id
    const baseUrl = `${req.protocol}://${req.get("host")}/image`

    const imageUrls = {}
    if (req.files) {
      Object.keys(req.files).forEach(key => {
        const file = req.files[key][0]
        imageUrls[key] = `${baseUrl}?imageName=${key}&movieId=${movieId}`
      })
    }

    res.status(200).send({
      success: true,
      imageUrls
    })
  } catch (e) {
    console.error(e)
    res.status(500).send({
      success: false,
      message: "UNABLE_TO_PROCESS_INFORMATION"
    })
  }
})

export default router
