// admin/pages/Settings.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FaLock, FaEye, FaEyeSlash,
  FaSignOutAlt, FaKey, FaEnvelope,
} from 'react-icons/fa'
import { MdSecurity } from 'react-icons/md'
import PageHeader from '../components/PageHeader'
import { FormField, SubmitBtn } from '../components/FormField'
import { useAdminToast } from '../hooks/ToastContext'
import authService from '../services/authService'

function PasswordInput({ label, name, value, onChange, show, onToggle, error, placeholder }) {
  return (
    <FormField label={label} required error={error}>
      <div className="relative">
        <FaLock className="absolute left-[13px] top-1/2 -translate-y-1/2 text-slate-400 text-[12px] pointer-events-none" />
        <input
          type={show ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full h-[42px] pl-[36px] pr-[42px] rounded-[10px]
            border border-slate-200 bg-white
            text-[13.5px] font-medium text-slate-700
            placeholder:text-slate-300
            focus:outline-none focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10
            transition-all duration-200
            ${error ? 'border-red-400 bg-red-50' : ''}
          `}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-[12px] top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          {show ? <FaEyeSlash className="text-[13px]" /> : <FaEye className="text-[13px]" />}
        </button>
      </div>
    </FormField>
  )
}

export default function Settings() {
  const toast    = useAdminToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [show, setShow] = useState({ current: false, newPass: false, confirm: false })
  const [errors, setErrors] = useState({})
  const [saving, setSaving] = useState(false)

  const [forgotEmail,  setForgotEmail]  = useState('')
  const [forgotSaving, setForgotSaving] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(er => ({ ...er, [name]: '' }))
  }

  const validate = () => {
    const err = {}
    if (!form.currentPassword) err.currentPassword = 'Current password required'
    if (!form.newPassword)     err.newPassword     = 'New password required'
    if (form.newPassword && form.newPassword.length < 6) err.newPassword = 'Min 6 characters'
    if (!form.confirmPassword) err.confirmPassword = 'Confirm your password'
    if (form.newPassword !== form.confirmPassword) err.confirmPassword = 'Passwords do not match'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleChangePassword = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      // await authService.changePassword(form)
      await new Promise(r => setTimeout(r, 800)) // mock
      toast.success('Password changed successfully!')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to change password')
    } finally { setSaving(false) }
  }

  // Send OTP to email, then navigate to ForgotPassword page
  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) { toast.error('Enter your email address'); return }
    setForgotSaving(true)
    try {
      // await authService.sendOtp(forgotEmail)   ← replace with real call
      await new Promise(r => setTimeout(r, 800)) // mock
      toast.success('OTP sent! Check your email.')
      // Pass email via route state so ForgotPassword page knows which address was used
      navigate('/admin/forgot-password', { state: { email: forgotEmail } })
    } catch {
      toast.error('Failed to send OTP')
    } finally { setForgotSaving(false) }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
    toast.success('Logged out successfully!')
  }

  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your account and security" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">

        {/* ── Change Password Card ── */}
        <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_18px_rgba(11,30,75,0.07)] p-[28px]">
          <div className="flex items-center gap-[12px] mb-[24px] pb-[16px] border-b border-slate-100">
            <div className="w-[42px] h-[42px] rounded-[12px] bg-gradient-to-br from-[#0B1E4B] to-[#152B6B] flex items-center justify-center">
              <MdSecurity className="text-white text-[20px]" />
            </div>
            <div>
              <h3 className="text-[16px] font-extrabold text-[#0B1E4B] m-0">Change Password</h3>
              <p className="text-[12px] text-slate-400 m-0">Update your admin password</p>
            </div>
          </div>

          <div className="flex flex-col gap-[14px]">
            <PasswordInput
              label="Current Password" name="currentPassword"
              value={form.currentPassword} onChange={handleChange}
              show={show.current} onToggle={() => setShow(s => ({ ...s, current: !s.current }))}
              placeholder="Enter current password" error={errors.currentPassword}
            />
            <PasswordInput
              label="New Password" name="newPassword"
              value={form.newPassword} onChange={handleChange}
              show={show.newPass} onToggle={() => setShow(s => ({ ...s, newPass: !s.newPass }))}
              placeholder="Enter new password (min 6 chars)" error={errors.newPassword}
            />
            <PasswordInput
              label="Confirm New Password" name="confirmPassword"
              value={form.confirmPassword} onChange={handleChange}
              show={show.confirm} onToggle={() => setShow(s => ({ ...s, confirm: !s.confirm }))}
              placeholder="Re-enter new password" error={errors.confirmPassword}
            />

            <SubmitBtn loading={saving} onClick={handleChangePassword}>
              <FaKey className="text-[11px]" /> Update Password
            </SubmitBtn>
          </div>
        </div>

        {/* ── Right column ── */}
        <div className="flex flex-col gap-[20px]">

          {/* Forgot Password */}
          <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_18px_rgba(11,30,75,0.07)] p-[24px]">
            <div className="flex items-center gap-[10px] mb-[18px]">
              <div className="w-[38px] h-[38px] rounded-[10px] bg-[#FFF3EC] flex items-center justify-center">
                <FaEnvelope className="text-[#F05A1A] text-[15px]" />
              </div>
              <div>
                <h3 className="text-[15px] font-extrabold text-[#0B1E4B] m-0">Forgot Password?</h3>
                <p className="text-[12px] text-slate-400 m-0">Enter email to receive an OTP</p>
              </div>
            </div>

            <div className="flex gap-[10px]">
              <div className="relative flex-1">
                <FaEnvelope className="absolute left-[12px] top-1/2 -translate-y-1/2 text-slate-400 text-[12px] pointer-events-none" />
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleForgotPassword()}
                  placeholder="Admin email address"
                  className="w-full h-[42px] pl-[36px] pr-[12px] rounded-[10px] border border-slate-200 bg-white text-[13.5px] font-medium text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10 transition-all"
                />
              </div>
              <button
                onClick={handleForgotPassword}
                disabled={forgotSaving}
                className="px-[18px] h-[42px] rounded-[10px] bg-[#0B1E4B] text-white text-[13px] font-extrabold hover:bg-[#152B6B] disabled:opacity-60 transition-all flex items-center gap-[6px] whitespace-nowrap"
              >
                {forgotSaving
                  ? <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <FaEnvelope className="text-[11px]" />
                }
                Send OTP
              </button>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_18px_rgba(11,30,75,0.07)] p-[24px]">
            <div className="flex items-center gap-[12px] mb-[16px]">
              <div className="w-[48px] h-[48px] rounded-full bg-gradient-to-br from-[#0B1E4B] to-[#F05A1A] flex items-center justify-center text-white text-[18px] font-extrabold shadow-md">A</div>
              <div>
                <p className="text-[15px] font-extrabold text-[#0B1E4B] m-0">Admin User</p>
                <p className="text-[12px] text-slate-400 m-0">admin@udisports.org</p>
                <span className="text-[10px] font-bold text-[#1a6b3a] bg-green-50 border border-green-200 px-[8px] py-[2px] rounded-full">Super Admin</span>
              </div>
            </div>

            <div className="pt-[16px] border-t border-slate-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-[8px] h-[42px] rounded-[10px] bg-red-50 border border-red-200 text-red-600 text-[13px] font-extrabold hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200"
              >
                <FaSignOutAlt className="text-[13px]" />
                Logout from Admin Panel
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}