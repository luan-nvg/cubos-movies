import express from "express"
import {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovieById,
  imageMovie
} from "../controllers/movieController"
import { authMiddleware } from "../middleware/authMiddleware"
import { downloadFileFromS3 } from "../services/uploadService"

import multer from "multer"

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// All movie routes require authentication
router.post("/image/:id", authMiddleware, upload.single("poster"), imageMovie)
router.get("/image/:id", async (req, res) => {
  try {
    const fileKey = `movies/${req.params.id}`

    console.log("ESTE É:", fileKey)
    // const imageBuffer = await downloadFileFromS3(fileKey)

    // Defina o tipo de conteúdo correto
    res.set("Content-Type", "image/jpeg") // ou o tipo correspondente à sua imagem
    // res.send(imageBuffer)
  } catch (error) {
    res.status(404).send("Imagem não encontrada")
  }
})
router.post("/", authMiddleware, createMovie)
router.put("/:id", authMiddleware, updateMovie)
router.delete("/:id", authMiddleware, deleteMovie)
router.get("/", authMiddleware, getMovies)
router.get("/:id", authMiddleware, getMovieById)

export default router
