// admin/services/api.js
import axios from 'axios'

const DEFAULT_API_URL = 'http://localhost:5000/api'

const normalizeApiBaseUrl = (rawUrl) => {
  const raw = (rawUrl || '').trim()
  if (!raw) return DEFAULT_API_URL

  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw
  if (raw.startsWith(':')) return `http://localhost${raw}`
  if (raw.startsWith('localhost') || raw.startsWith('127.0.0.1')) return `http://${raw}`

  try {
    return new URL(raw, window.location.origin).toString().replace(/\/$/, '')
  } catch {
    return DEFAULT_API_URL
  }
}

const api = axios.create({
  baseURL: normalizeApiBaseUrl(import.meta.env.VITE_API_URL),
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const rawToken = localStorage.getItem('adminToken')
  const token = (rawToken || '').trim()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, (err) => Promise.reject(err))

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status
    const message = err.response?.data?.message || ''
    const isAuthFailureMessage =
      message.includes('Invalid token') ||
      message.includes('Invalid or expired token') ||
      message.includes('Authentication required')

    // Avoid forcing logout for every 401 (e.g. endpoint issues).
    // Logout only when token is explicitly invalid/expired.
    if (status === 401 && isAuthFailureMessage) {
      localStorage.removeItem('adminToken')
      window.location.href = '/admin/login'
    }
    return Promise.reject(err)
  }
)

export default api