import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import { z } from "zod"
import { uploadToS3 } from "../services/uploadService"
import { scheduleEmailReminder } from "../services/emailService"
import { RequestHandler } from "express"

const prisma = new PrismaClient()

// Validation Schema
const movieSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  originalTitle: z.string().optional(),
  description: z.string().optional(),
  releaseDate: z.coerce.date(),
  budget: z.number().optional(),
  genres: z.array(z.string()).optional(),
  duration: z.number().int().positive().optional()
})

export const createMovie: RequestHandler = async (req, res) => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Não autorizado" })
      return
    }

    const movieData = movieSchema.parse({
      ...req.body,
      releaseDate: new Date(req.body.releaseDate)
    })

    let posterUrl
    if (req.file) {
      posterUrl = await uploadToS3(req.file, `movies/${req.userId}`)
    }

    const movie = await prisma.movie.create({
      data: {
        ...movieData,
        posterUrl,
        userId: req.userId
      }
    })

    if (new Date(movieData.releaseDate) > new Date()) {
      await scheduleEmailReminder(movie.id, req.userId)
    }

    res.status(201).json(movie)
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: "Falha na validação", details: error.errors })
    } else {
      res.status(500).json({ error: "Falha ao criar o filme" })
    }
  }
}

export const updateMovie: RequestHandler = async (req, res): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ error: "Não autorizado" })
      return
    }

    const { id } = req.params

    const existingMovie = await prisma.movie.findFirst({
      where: {
        id,
        userId: req.userId
      }
    })

    if (!existingMovie) {
      res.status(404).json({ error: "Filme não encontrado" })
      return
    }

    const movieData = movieSchema.parse({
      ...req.body,
      releaseDate: new Date(req.body.releaseDate)
    })

    let posterUrl = existingMovie.posterUrl
    if (req.file) {
      posterUrl = await uploadToS3(req.file, `movies/${req.userId}`)
    }

    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: {
        ...movieData,
        posterUrl
      }
    })

    const releaseDate = movieData.releaseDate ?? new Date()
    if (new Date(releaseDate) > new Date()) {
      await scheduleEmailReminder(updatedMovie.id, req.userId)
    }

    res.json(updatedMovie)
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Falha na validação",
        details: error.errors
      })
    }
    res.status(500).json({ error: "Falha ao atualizar o filme" })
  }
}

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    // Ensure user is authenticated
    if (!req.userId) {
      res.status(401).json({ error: "Não autorizado" })
      return
    }

    const { id } = req.params

    // Check if movie exists and belongs to user
    const existingMovie = await prisma.movie.findFirst({
      where: {
        id,
        userId: req.userId
      }
    })

    if (!existingMovie) {
      res.status(404).json({ error: "Filme não encontrado" })
      return
    }

    // Delete movie
    await prisma.movie.delete({ where: { id } })

    res.status(204).send()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Falha ao excluir o filme" })
  }
}

export const getMovies = async (req: Request, res: Response) => {
  try {
    // Ensure user is authenticated
    if (!req.userId) {
      res.status(401).json({ error: "Não autorizado" })
      return
    }

    // Pagination and filtering
    const page = parseInt(req.query.page as string) || 1
    let limit = parseInt(req.query.limit, 10) || 10 // 10 items per page as specified in requirements
    const offset = (page - 1) * limit

    // Search and filter parameters
    const { search, minDuration, maxDuration, startDate, endDate, genre } =
      req.query

    // Build where clause for filtering
    const where: any = { userId: req.userId }

    // Title search
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: "insensitive" } },
        { originalTitle: { contains: search as string, mode: "insensitive" } }
      ]
    }

    // Duration filter
    if (minDuration || maxDuration) {
      where.duration = {}
      if (minDuration) where.duration.gte = Number(minDuration)
      if (maxDuration) where.duration.lte = Number(maxDuration)
    }

    // Release date filter
    if (startDate || endDate) {
      where.releaseDate = {}
      if (startDate) where.releaseDate.gte = new Date(startDate as string)
      if (endDate) where.releaseDate.lte = new Date(endDate as string)
    }

    // Genre filter
    if (genre) {
      where.genres = { has: genre as string }
    }

    // Fetch movies with pagination
    const movies = await prisma.movie.findMany({
      where,
      take: limit,
      skip: offset,
      orderBy: { createdAt: "desc" }
    })

    // Get total count for pagination
    const total = await prisma.movie.count({ where })

    res.json({
      movies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Falha ao recuperar os filmes" })
  }
}

export const getMovieById = async (req: Request, res: Response) => {
  try {
    // Ensure user is authenticated
    if (!req.userId) {
      res.status(401).json({ error: "Não autorizado" })
      return
    }

    const { id } = req.params

    // Find movie
    const movie = await prisma.movie.findFirst({
      where: {
        id,
        userId: req.userId
      }
    })

    if (!movie) {
      res.status(404).json({ error: "Filme não encontrado" })
      return
    }

    res.json(movie)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Falha ao recuperar o filme" })
  }
}
