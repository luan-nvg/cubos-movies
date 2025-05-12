import express from "express"
import {
  createMovie,
  updateMovie,
  deleteMovie,
  getMovies,
  getMovieById
} from "../controllers/movieController"
import { authMiddleware } from "../middleware/authMiddleware"
import multer from "multer"

const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// All movie routes require authentication
router.post("/", authMiddleware, upload.single("poster"), createMovie)
router.put("/:id", authMiddleware, upload.single("poster"), updateMovie)
router.delete("/:id", authMiddleware, deleteMovie)
router.get("/", authMiddleware, getMovies)
router.get("/:id", authMiddleware, getMovieById)

export default router
