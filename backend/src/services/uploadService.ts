import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand
} from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
})

export const uploadToS3 = async (
  file: Express.Multer.File,
  prefix: string
): Promise<string> => {
  // Generate unique filename
  // const filename = `${prefix}/${uuidv4()}-${file.originalname}`
  const filename = prefix
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: prefix,
    Body: file.buffer,
    ContentType: file.mimetype
  }

  try {
    const command = new PutObjectCommand(params)
    await s3Client.send(command)

    // Return full S3 URL
    return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${filename}`
  } catch (error) {
    console.error("S3 Upload Error:", error)
    throw new Error("File upload failed")
  }
}

/**
 * Obtém a URL assinada temporária para acesso à imagem no S3
 * @param fileKey - A chave do objeto S3 (o caminho do arquivo após o nome do bucket)
 * @param expiresIn - Tempo de expiração da URL em segundos (padrão: 3600s = 1h)
 * @returns URL assinada com acesso temporário ao arquivo
 */
export const getSignedImageUrl = async (
  fileKey: string,
  expiresIn: number = 3600
): Promise<string> => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileKey
  }

  try {
    const command = new GetObjectCommand(params)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })
    return signedUrl
  } catch (error) {
    console.error("Erro ao obter URL assinada:", error)
    throw new Error("Falha ao recuperar a URL da imagem")
  }
}

/**
 * Extrai a chave do arquivo a partir da URL completa do S3
 * @param s3Url - URL completa do S3
 * @returns A chave do arquivo S3
 */
export const extractKeyFromS3Url = (s3Url: string): string => {
  const urlObj = new URL(s3Url)
  // Remove a barra inicial para obter a chave correta
  return urlObj.pathname.substring(1)
}

/**
 * Baixa o arquivo do S3 e retorna como um buffer
 * @param fileKey - A chave do objeto S3
 * @returns Buffer com o conteúdo do arquivo
 */
export const downloadFileFromS3 = async (fileKey: string): Promise<Buffer> => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileKey
  }

  try {
    const command = new GetObjectCommand(params)
    const response = await s3Client.send(command)

    // Converte o stream para buffer
    if (!response.Body) {
      throw new Error("Resposta sem corpo")
    }

    // Para trabalhar com stream do response.Body
    const chunks: Buffer[] = []

    for await (const chunk of response.Body as any) {
      chunks.push(Buffer.from(chunk))
    }

    return Buffer.concat(chunks)
  } catch (error) {
    console.error("Erro ao baixar arquivo do S3:", error)
    throw new Error("Falha ao baixar a imagem")
  }
}
