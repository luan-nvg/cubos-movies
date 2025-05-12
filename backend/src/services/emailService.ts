import nodemailer from "nodemailer"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: parseInt(process.env.SMTP_PORT || "1025"),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

export const scheduleEmailReminder = async (
  movieId: string,
  userId: string
) => {
  try {
    // Find user details
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    // Find movie details
    const movie = await prisma.movie.findUnique({
      where: { id: movieId }
    })

    if (!movie) {
      throw new Error("Filme não encontrado")
    }

    // Create email reminder record
    const emailReminder = await prisma.emailReminder.create({
      data: {
        movieId,
        email: user.email
      }
    })

    // Schedule the email (in a real-world scenario, you'd use a job scheduler like Bull or Agenda)
    const reminderDate = new Date(movie.releaseDate)

    // Create a schedule or trigger for sending email
    // For this example, we'll just log (in production, use a proper job scheduler)
    console.log(
      `Lembrete de email agendado para o filme ${movie.title} para ${user.email} em ${reminderDate}`
    )

    return emailReminder
  } catch (error) {
    console.error("Erro ao agendar lembrete de email:", error)
    throw error
  }
}

export const sendReleaseReminderEmail = async (movieId: string) => {
  try {
    // Find the email reminder
    const reminder = await prisma.emailReminder.findFirst({
      where: {
        movieId,
        sentAt: null
      }
    })

    if (!reminder) {
      return
    }

    // Find movie and user details
    const movie = await prisma.movie.findUnique({
      where: { id: movieId }
    })

    if (!movie) {
      throw new Error("Filme não encontrado")
    }

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || "noreply@movieapp.com",
      to: reminder.email,
      subject: `Lembrete de Lançamento de Filme: ${movie.title}`,
      html: `
        <h1>Lembrete de Lançamento de Filme</h1>
        <p>O seu filme "${movie.title}" será lançado hoje!</p>
        <p>Data de Lançamento: ${movie.releaseDate.toLocaleDateString()}</p>
      `
    })

    // Update reminder as sent
    await prisma.emailReminder.update({
      where: { id: reminder.id },
      data: { sentAt: new Date() }
    })
  } catch (error) {
    console.error("Erro ao enviar email:", error)
  }
}
