import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

import authRoutes from './routes/authRoutes.js'
import blogRoutes from './routes/blogRoutes.js'
import memberRoutes from './routes/memberRoutes.js'
import playerRoutes from './routes/playerRoutes.js'
import incomingRoutes from './routes/incomingRoutes.js'
import publicRoutes from './routes/publicRoutes.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 5000
const UPLOADS = process.env.UPLOADS_DIR || 'uploads'

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, UPLOADS)))

app.use('/api/auth', authRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/members', memberRoutes)
app.use('/api/players', playerRoutes)
app.use('/api/incoming', incomingRoutes)
app.use('/api/public', publicRoutes)

app.get('/api/health', (req, res) => res.json({ ok: true, message: 'UDI API running' }))

app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({ message: err.message || 'Server error' })
})

async function start() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/udiisa'
    await mongoose.connect(uri)
    console.log('MongoDB connected')
  } catch (e) {
    console.error('MongoDB connection failed:', e.message)
    process.exit(1)
  }
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`))
}

start()
