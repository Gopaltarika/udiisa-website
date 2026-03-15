/**
 * Public API client for website (no auth).
 * Uses same base URL as admin: VITE_API_URL or http://localhost:5000/api
 */
import axios from 'axios'

const DEFAULT_API_URL = (() => {
  if (typeof window === 'undefined') return 'http://localhost:5000/api'

  const host = String(window.location.hostname || '').toLowerCase()
  if (host === 'localhost' || host === '127.0.0.1') return 'http://localhost:5000/api'
  return `${window.location.origin.replace(/\/$/, '')}/api`
})()

const normalizeApiBaseUrl = (rawUrl) => {
  const raw = (rawUrl || '').trim()
  if (!raw) return DEFAULT_API_URL

  if (raw.startsWith('http://') || raw.startsWith('https://')) return raw.replace(/\/$/, '')
  if (raw.startsWith('/')) {
    if (typeof window === 'undefined') return DEFAULT_API_URL
    return `${window.location.origin.replace(/\/$/, '')}${raw}`.replace(/\/$/, '')
  }
  if (raw.startsWith(':')) return `http://localhost${raw}`
  if (raw.startsWith('localhost') || raw.startsWith('127.0.0.1')) return `http://${raw}`

  try {
    return new URL(raw, window.location.origin).toString().replace(/\/$/, '')
  } catch {
    return DEFAULT_API_URL
  }
}

const baseURL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL)
const CACHE_TTL_MS = 5 * 60 * 1000
const cacheStore = new Map()
const inflightStore = new Map()

const publicApi = axios.create({
  baseURL,
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
})

const now = () => Date.now()

const fromCache = (key) => {
  const hit = cacheStore.get(key)
  if (!hit) return null
  if (hit.expiresAt <= now()) {
    cacheStore.delete(key)
    return null
  }
  return hit.value
}

const setCache = (key, value, ttlMs = CACHE_TTL_MS) => {
  cacheStore.set(key, { value, expiresAt: now() + ttlMs })
}

const fetchWithCache = async (key, requestFn, { force = false, ttlMs = CACHE_TTL_MS } = {}) => {
  if (!force) {
    const cached = fromCache(key)
    if (cached !== null) return cached
  }

  const running = inflightStore.get(key)
  if (running) return running

  const req = requestFn()
    .then((value) => {
      setCache(key, value, ttlMs)
      return value
    })
    .finally(() => {
      inflightStore.delete(key)
    })

  inflightStore.set(key, req)
  return req
}

// ─── Public data (no auth) ─────────────────────────────────────
export const getPublicBlogs = (params) =>
  publicApi.get('/public/blogs', { params }).then((res) => res.data)

export const getPublicBlogBySlug = (slug) =>
  publicApi.get(`/public/blogs/slug/${slug}`).then((res) => res.data)

export const getPublicCommittee = () =>
  publicApi.get('/public/members/committee').then((res) => res.data)

export const getPublicCommittees = (options = {}) =>
  fetchWithCache(
    'public:committees',
    () => publicApi.get('/public/committees').then((res) => res.data),
    options
  )

export const getPublicSpecialMembers = () =>
  publicApi.get('/public/members/special').then((res) => res.data)

export const getPublicGeneralMembers = (type) =>
  publicApi
    .get('/public/members/general', { params: type ? { type } : {} })
    .then((res) => res.data)

export const getPublicPlayers = () =>
  publicApi.get('/public/players').then((res) => res.data)

// ─── Incoming forms (contact, member, OTP) ───────────────────────
export const submitContact = (data) =>
  publicApi.post('/incoming/public/contact', data).then((res) => res.data)

export const submitMemberForm = (formData) =>
  publicApi
    .post('/incoming/public/member', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data)

export const sendOtp = (email) =>
  publicApi.post('/incoming/public/send-otp', { email }).then((res) => res.data)

export const verifyOtp = (email, otp) =>
  publicApi
    .post('/incoming/public/verify-otp', { email, otp })
    .then((res) => res.data)

export default publicApi
