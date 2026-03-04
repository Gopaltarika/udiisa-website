/**
 * Email service for sending OTP.
 * Uses nodemailer with SMTP from env.
 * Set: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 * For Gmail: use App Password (not regular password)
 */

import nodemailer from 'nodemailer'

let transporter = null

function getTransporter() {
  if (transporter) return transporter
  const host = process.env.SMTP_HOST || 'smtp.gmail.com'
  const port = parseInt(process.env.SMTP_PORT || '587', 10)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!user || !pass) {
    console.warn('SMTP not configured (SMTP_USER, SMTP_PASS). OTP emails will not be sent.')
    return null
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
  return transporter
}

export async function sendOTPEmail(to, otp) {
  const trans = getTransporter()
  if (!trans) {
    console.log('📧 OTP (SMTP not configured):', otp, '→', to)
    return { ok: true, mock: true }
  }

  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 420px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #0B1E4B; margin: 0 0 16px;">UDI Sports NGO</h2>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
        Your email verification OTP is:
      </p>
      <div style="background: linear-gradient(135deg, #F05A1A, #FF7D42); color: white; font-size: 28px; font-weight: 800; letter-spacing: 8px; padding: 16px 24px; border-radius: 12px; text-align: center; margin: 0 0 24px;">
        ${otp}
      </div>
      <p style="color: #64748b; font-size: 13px; margin: 0;">
        This OTP is valid for <strong>10 minutes</strong>. Do not share it with anyone.
      </p>
      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
      <p style="color: #94a3b8; font-size: 11px; margin: 0;">
        If you didn't request this, please ignore this email.
      </p>
    </div>
  `

  await trans.sendMail({
    from: process.env.SMTP_FROM || `"UDI Sports NGO" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Your OTP for Contact Form - UDI Sports NGO',
    html,
  })
  return { ok: true }
}

/** Send password reset link email (admin) */
export async function sendResetPasswordEmail(to, resetLink) {
  const trans = getTransporter()
  if (!trans) {
    console.log('📧 Reset link (SMTP not configured):', resetLink, '→', to)
    return { ok: true, mock: true }
  }

  const html = `
    <div style="font-family: 'Segoe UI', sans-serif; max-width: 420px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #0B1E4B; margin: 0 0 16px;">UDI Sports Admin</h2>
      <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0 0 20px;">
        You requested a password reset. Click the button below to set a new password:
      </p>
      <p style="margin: 0 0 24px;">
        <a href="${resetLink}" style="display: inline-block; padding: 14px 28px; background: linear-gradient(135deg, #F05A1A, #FF7D42); color: white; text-decoration: none; font-weight: 800; border-radius: 12px;">Reset Password</a>
      </p>
      <p style="color: #64748b; font-size: 13px; margin: 0;">
        This link is valid for <strong>1 hour</strong>. If you didn't request this, please ignore this email.
      </p>
    </div>
  `

  await trans.sendMail({
    from: process.env.SMTP_FROM || `"UDI Sports NGO" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Reset your admin password - UDI Sports',
    html,
  })
  return { ok: true }
}
