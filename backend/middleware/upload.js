import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOADS = process.env.UPLOADS_DIR || 'uploads'
const ALLOWED_IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/tiff',
  'image/heic',
  'image/heif',
  'image/avif',
  'image/svg+xml',
  'image/x-icon',
  'image/vnd.microsoft.icon',
])
const ALLOWED_IMAGE_EXTENSIONS = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.bmp',
  '.tif',
  '.tiff',
  '.heic',
  '.heif',
  '.avif',
  '.svg',
  '.ico',
])

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Keep all image uploads in one stable folder so stored DB paths stay consistent.
    const dir = path.join(__dirname, '..', UPLOADS, 'image')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg'
    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`
    cb(null, name)
  },
})

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const mime = String(file.mimetype || '').toLowerCase()
    const ext = path.extname(file.originalname || '').toLowerCase()
    const hasAllowedMime = ALLOWED_IMAGE_MIME_TYPES.has(mime)
    const hasAllowedExt = ALLOWED_IMAGE_EXTENSIONS.has(ext)

    // Some clients send generic MIME for valid image files.
    if (hasAllowedMime || hasAllowedExt) cb(null, true)
    else cb(new Error('Unsupported image format'), false)
  },
})

export const uploadFields = (fields) => upload.fields(fields)
export const uploadSingle = (fieldName) => upload.single(fieldName)
