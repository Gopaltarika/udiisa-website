import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import Admin from '../models/Admin.js'
import { setResetToken, getResetToken, clearResetToken } from '../utils/resetTokenStore.js'
import { sendResetPasswordEmail } from '../utils/emailService.js'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
const FRONTEND_URL = (process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '')

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' })
    const admin = await Admin.findOne({ email: email.trim().toLowerCase() })
    if (!admin) return res.status(401).json({ message: 'Invalid email or password' })
    const match = await bcrypt.compare(password, admin.password)
    if (!match) return res.status(401).json({ message: 'Invalid email or password' })
    const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '7d' })
    return res.json({ token, admin: { id: admin._id, email: admin.email, name: admin.name } })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Login failed' })
  }
}

export const getProfile = async (req, res) => {
  try {
    return res.json({ admin: req.admin })
  } catch {
    return res.status(500).json({ message: 'Failed to get profile' })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Current and new password required' })
    const admin = await Admin.findById(req.admin._id)
    const match = await bcrypt.compare(currentPassword, admin.password)
    if (!match) return res.status(401).json({ message: 'Current password is wrong' })
    admin.password = await bcrypt.hash(newPassword, 10)
    await admin.save()
    return res.json({ message: 'Password updated' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Update failed' })
  }
}

export const logout = async (req, res) => {
  return res.json({ message: 'Logged out' })
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const em = (email || '').trim().toLowerCase()
    if (!em) return res.status(400).json({ message: 'Email required' })

    const admin = await Admin.findOne({ email: em })
    if (!admin) {
      // Don't reveal if email exists
      return res.json({ message: 'If this email is registered, you will receive reset instructions.' })
    }

    const token = crypto.randomBytes(32).toString('hex')
    setResetToken(token, em)
    const resetLink = `${FRONTEND_URL}/admin/reset-password?token=${token}`
    await sendResetPasswordEmail(em, resetLink)

    return res.json({ message: 'If this email is registered, you will receive reset instructions.' })
  } catch (e) {
    console.error('forgotPassword:', e)
    return res.status(500).json({ message: 'Failed to process request' })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body
    if (!token || !newPassword) return res.status(400).json({ message: 'Token and new password required' })
    if (String(newPassword).length < 6) return res.status(400).json({ message: 'Password must be at least 6 characters' })

    const email = getResetToken(token)
    if (!email) return res.status(400).json({ message: 'Invalid or expired reset link. Please request a new one.' })

    const admin = await Admin.findOne({ email })
    if (!admin) return res.status(400).json({ message: 'Invalid or expired reset link.' })

    admin.password = await bcrypt.hash(newPassword, 10)
    await admin.save()
    clearResetToken(token)

    return res.json({ message: 'Password updated. You can now sign in.' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to reset password' })
  }
}
