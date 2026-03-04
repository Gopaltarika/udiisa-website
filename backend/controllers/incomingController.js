import IncomingContact from '../models/IncomingContact.js'
import IncomingMember from '../models/IncomingMember.js'
import { setOTP, verifyOTP } from '../utils/otpStore.js'
import { sendOTPEmail } from '../utils/emailService.js'
import { uploadImageFromFile } from '../utils/cloudinary.js'
import { toPublicMediaUrl } from '../utils/mediaUrl.js'

const NAME_REGEX = /^[A-Za-z][A-Za-z\s.'-]{1,79}$/
const isValidFullName = (value) => NAME_REGEX.test(String(value || '').trim())

// ─── Public: Send OTP to email (no auth) ───────
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body
    const em = (email || '').trim()
    if (!em || !em.includes('@')) {
      return res.status(400).json({ message: 'Valid email address is required' })
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    setOTP(em, otp)
    await sendOTPEmail(em, otp)
    return res.json({ message: 'OTP sent to your email', expiresIn: 600 })
  } catch (e) {
    console.error('sendOtp error:', e)
    return res.status(500).json({ message: e.message || 'Failed to send OTP' })
  }
}

// ─── Public: Verify OTP (no auth) ───────
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body
    const em = (email || '').trim()
    const otpStr = String(otp || '').replace(/\D/g, '')
    if (!em || !otpStr || otpStr.length !== 6) {
      return res.status(400).json({ message: 'Email and 6-digit OTP are required' })
    }
    const valid = verifyOTP(em, otpStr)
    if (!valid) {
      return res.status(400).json({ message: 'Invalid or expired OTP. Please request a new one.' })
    }
    return res.json({ message: 'Email verified successfully' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Verification failed' })
  }
}

// ─── Public: Submit contact form (no auth) ───────
export const submitContact = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      age,
      aadharNumber,
      qualification,
      gender,
      message,
    } = req.body

    if (!fullName || !email || !message) {
      return res.status(400).json({ message: 'Full name, email and message are required' })
    }
    if (!isValidFullName(fullName)) {
      return res.status(400).json({ message: 'Please enter a valid full name (letters only)' })
    }

    const doc = await IncomingContact.create({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: (phone || '').toString().trim(),
      address: (address || '').trim(),
      age: age ? Number(age) : undefined,
      aadharNumber: (aadharNumber || '').trim(),
      qualification: (qualification || '').trim(),
      gender: (gender || '').trim(),
      message: message.trim(),
    })
    return res.status(201).json({ message: 'Message sent successfully', id: doc._id })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to submit' })
  }
}

// ─── Public: Submit membership form (no auth) ─────
export const submitMemberForm = async (req, res) => {
  try {
    const body = { ...req.body }
    const formType = body.formType === 'special-member' ? 'special-member' : 'general-member'
    if (!isValidFullName(body.fullName)) {
      return res.status(400).json({ message: 'Please enter a valid full name (letters only)' })
    }
    if (req.file) {
      body.photo =
        (await uploadImageFromFile(req.file, 'udiisa/incoming-members')) || `/uploads/image/${req.file.filename}`
    }

    const doc = await IncomingMember.create({
      formType,
      memberType: body.memberType || '',
      fullName: body.fullName || '',
      age: body.age ? Number(body.age) : undefined,
      gender: body.gender || '',
      companyName: body.companyName || '',
      email: body.email || '',
      aadharNumber: body.aadharNumber || '',
      panNumber: body.panNumber || '',
      qualification: body.qualification || '',
      fullAddress: body.fullAddress || body.address || '',
      sportsInterest: body.sportsInterest || '',
      utrNumber: body.utrNumber || '',
      paymentSender: body.paymentSender || '',
      designation: body.designation || '',
      organization: body.organization || '',
      linkedin: body.linkedin || '',
      contribution: body.contribution || '',
      message: body.message || '',
      photo: body.photo || null,
    })
    return res.status(201).json({ message: 'Application submitted successfully', id: doc._id })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to submit' })
  }
}

// ─── Admin: List contact forms ───────────────────
export const getContactForms = async (req, res) => {
  try {
    const { search } = req.query
    const filter = {}
    if (search && search.trim()) {
      filter.$or = [
        { fullName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { message: new RegExp(search, 'i') },
      ]
    }
    const list = await IncomingContact.find(filter).sort({ createdAt: -1 }).lean()
    return res.json(list)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch' })
  }
}

export const deleteContactForm = async (req, res) => {
  try {
    const doc = await IncomingContact.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    return res.json({ message: 'Deleted' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to delete' })
  }
}

// ─── Admin: List member forms ─────────────────────
export const getMemberForms = async (req, res) => {
  try {
    const { search } = req.query
    const filter = {}
    if (search && search.trim()) {
      filter.$or = [
        { fullName: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { memberType: new RegExp(search, 'i') },
        { utrNumber: new RegExp(search, 'i') },
      ]
    }
    const list = await IncomingMember.find(filter).sort({ createdAt: -1 }).lean()
    list.forEach(m => {
      m.photo = toPublicMediaUrl(req, m.photo)
      m.name = m.fullName
      m.phone = m.phone || '—'
      if (m.formType === 'special-member') {
        m.memberType = 'Special Member'
        m.amount = '—'
      } else {
        const amt = m.memberType === 'sports-men' ? '₹1,200' : m.memberType === 'general' ? '₹12,000' : '—'
        m.amount = amt
        m.memberType = m.memberType === 'sports-men'
          ? 'Sports Men'
          : m.memberType === 'general'
          ? 'General'
          : m.memberType || '—'
      }
      m.utr = m.utrNumber
      m.submittedAt = m.createdAt
    })
    return res.json(list)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch' })
  }
}

export const deleteMemberForm = async (req, res) => {
  try {
    const doc = await IncomingMember.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    return res.json({ message: 'Deleted' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to delete' })
  }
}
