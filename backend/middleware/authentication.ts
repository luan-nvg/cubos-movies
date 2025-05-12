import { Request, Response, NextFunction } from "express"
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

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" })
  }

  const parts = authHeader.split(" ")

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token error" })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token malformatted" })
  }

  try {
    const secret = process.env.JWT_SECRET

    if (!secret) {
      throw new Error("JWT_SECRET is not defined")
    }

    const decoded = jwt.verify(token, secret) as TokenPayload

    req.userId = decoded.userId

    return next()
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" })
  }
}
