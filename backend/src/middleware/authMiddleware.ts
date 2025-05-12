import { RequestHandler } from "express"
import jwt from "jsonwebtoken"

interface TokenPayload {
  userId: string
}

declare global {
  namespace Express {
    interface Request {
      userId?: string
    }
  }
}
export const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ error: "No token provided" })
    return
  }

  const parts = authHeader.split(" ")

  if (parts.length !== 2) {
    res.status(401).json({ error: "Token error" })
    return
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    res.status(401).json({ error: "Token malformatted" })
    return
  }

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error("JWT_SECRET is not defined")
    }

    const decoded = jwt.verify(token, secret) as { userId: string }
    req.userId = decoded.userId

    next()
  } catch (err) {
    res.status(401).json({ error: "Invalid token" })
  }
}
