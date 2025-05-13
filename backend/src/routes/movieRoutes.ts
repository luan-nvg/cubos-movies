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

const router = express.Router()

router.post("/", authMiddleware, createMovie)
router.put("/:id", authMiddleware, updateMovie)
router.delete("/:id", authMiddleware, deleteMovie)
router.get("/", authMiddleware, getMovies)
router.get("/:id", authMiddleware, getMovieById) // mover esta para o fim

export default router
