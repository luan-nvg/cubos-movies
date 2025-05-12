import { Request, Response, NextFunction } from "express"

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err)

  // Handle different types of errors
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized" })
    return
  }

  if (err.name === "ValidationError") {
    res.status(400).json({
      error: "Validation failed",
      details: err.message
    })
    return
  }

  // Generic server error
  res.status(500).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message
  })
}
