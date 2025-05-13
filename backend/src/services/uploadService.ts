import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  HeadObjectCommand
} from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

// Initialize S3 client with timeout configuration
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  },
  // Add request timeout configuration
  requestHandler: {
    // @ts-ignore - the types may not be fully compatible but this works
    httpOptions: {
      timeout: 5000 // 5 second timeout for S3 operations
    }
  }
})

// Utility to check if a file exists in S3
export const checkFileExists = async (fileKey: string): Promise<boolean> => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileKey
  }

  try {
    const command = new HeadObjectCommand(params)
    await s3Client.send(command)
    return true
  } catch (error) {
    if ((error as any).name === "NotFound") {
      return false
    }
    throw error
  }
}

export const uploadToS3 = async (
  file: Express.Multer.File,
  prefix: string
): Promise<string> => {
  // Generate unique filename with original name for better traceability
  const filename = `${prefix}/${uuidv4()}-${file.originalname.replace(
    /\s+/g,
    "_"
  )}`

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: filename,
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
    throw new Error(`File upload failed: ${(error as Error).message}`)
  }
}

/**
 * Gets a temporary signed URL for accessing an image in S3
 * @param fileKey - The S3 object key (file path after bucket name)
 * @param expiresIn - URL expiration time in seconds (default: 3600s = 1h)
 * @returns Signed URL with temporary access to the file
 */
export const getSignedImageUrl = async (
  fileKey: string,
  expiresIn: number = 3600
): Promise<string> => {
  // Validate inputs
  if (!fileKey) {
    throw new Error("File key cannot be empty")
  }

  // First check if the file exists to fail fast
  const exists = await checkFileExists(fileKey).catch(err => {
    console.error("Error checking if file exists:", err)
    return false
  })

  if (!exists) {
    throw new Error(`File not found: ${fileKey}`)
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileKey
  }

  try {
    const command = new GetObjectCommand(params)
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })
    return signedUrl
  } catch (error) {
    console.error("Error getting signed URL:", error)
    throw new Error(`Failed to retrieve image URL: ${(error as Error).message}`)
  }
}

/**
 * Extracts the file key from a complete S3 URL
 * @param s3Url - Complete S3 URL
 * @returns The S3 file key
 */
export const extractKeyFromS3Url = (s3Url: string): string => {
  try {
    const urlObj = new URL(s3Url)
    // Remove the initial slash to get the correct key
    return urlObj.pathname.substring(1)
  } catch (error) {
    throw new Error(`Invalid S3 URL format: ${s3Url}`)
  }
}

/**
 * Downloads a file from S3 and returns it as a buffer
 * @param fileKey - The S3 object key
 * @returns Buffer with the file contents
 */
export const downloadFileFromS3 = async (fileKey: string): Promise<Buffer> => {
  // Validate inputs
  if (!fileKey) {
    throw new Error("File key cannot be empty")
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: fileKey
  }

  try {
    const command = new GetObjectCommand(params)
    const response = await s3Client.send(command)

    if (!response.Body) {
      throw new Error("Response without body")
    }

    // Working with response.Body stream
    const chunks: Buffer[] = []

    for await (const chunk of response.Body as any) {
      chunks.push(Buffer.from(chunk))
    }

    return Buffer.concat(chunks)
  } catch (error) {
    console.error("Error downloading file from S3:", error)
    throw new Error(`Failed to download image: ${(error as Error).message}`)
  }
}
