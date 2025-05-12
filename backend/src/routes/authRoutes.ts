import express from "express"
import { register, login } from "../controllers/authController"
import { authMiddleware } from "../middleware/authMiddleware"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", authMiddleware, (req, res) => {
  res.json({ userId: req.userId })
})

export default router
