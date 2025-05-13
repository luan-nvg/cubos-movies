import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes"
import movieRoutes from "./routes/movieRoutes"
import { errorHandler } from "./middleware/errorHandler"
import imageRoutes from "./routes/imageRoutes"

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use("/auth", authRoutes)
app.use("/movies", movieRoutes)
app.use("/image", imageRoutes)
// Global error handler
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app
