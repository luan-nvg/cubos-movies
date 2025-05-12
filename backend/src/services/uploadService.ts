import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { v4 as uuidv4 } from "uuid"

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
  const filename = `${prefix}/${uuidv4()}-${file.originalname}`

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
    throw new Error("File upload failed")
  }
}
