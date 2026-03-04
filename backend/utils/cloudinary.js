import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs/promises'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

export const isCloudinaryConfigured = Boolean(cloudName && apiKey && apiSecret)

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  })
} else {
  console.warn(
    'Cloudinary not configured. Falling back to local uploads. ' +
    'Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.'
  )
}

export async function uploadImageFromFile(file, folder = 'udiisa') {
  if (!file || !isCloudinaryConfigured) return null

  const result = await cloudinary.uploader.upload(file.path, {
    folder,
    resource_type: 'image',
  })

  await fs.unlink(file.path).catch(() => {})
  return result.secure_url || result.url || null
}
