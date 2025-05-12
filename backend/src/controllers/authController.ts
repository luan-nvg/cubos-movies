import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { z } from "zod"

const prisma = new PrismaClient()

// Esquemas de validação
const registerSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres")
})

const loginSchema = z.object({
  email: z.string().email("Endereço de e-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória")
})

export const register = async (req: Request, res: Response) => {
  try {
    // Validar entrada
    const { name, email, password } = registerSchema.parse(req.body)

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      res.status(400).json({ error: "Usuário já cadastrado" })
      return
    }

    // Criptografar senha
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Criar usuário
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    // Gerar token
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error("A variável de ambiente JWT_SECRET não está definida")
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "7d" })

    // Retornar informações do usuário e token
    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      token
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Falha na validação dos dados",
        detalhes: error.errors
      })
      return
    }
    console.error(error)
    res.status(500).json({ error: "Falha ao realizar o cadastro" })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    // Validar entrada
    const { email, password } = loginSchema.parse(req.body)

    // Buscar usuário
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(401).json({ error: "Credenciais inválidas" })
      return
    }

    // Verificar senha
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      res.status(401).json({ error: "Credenciais inválidas" })
      return
    }

    // Gerar token
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error("A variável de ambiente JWT_SECRET não está definida")
    }

    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: "7d" })

    // Retornar informações do usuário e token
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      token
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Falha na validação dos dados",
        detalhes: error.errors
      })
      return
    }
    console.error(error)
    res.status(500).json({ error: "Falha ao realizar o login" })
  }
}
