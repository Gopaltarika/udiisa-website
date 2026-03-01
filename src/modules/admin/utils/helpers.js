// admin/utils/helpers.js

export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

export const truncate = (str, n = 40) =>
  str && str.length > n ? str.slice(0, n) + '…' : str || '—'

export const buildFormData = (obj) => {
  const fd = new FormData()
  Object.entries(obj).forEach(([k, v]) => {
    if (v !== null && v !== undefined) fd.append(k, v)
  })
  return fd
}

export const validateRequired = (fields, values) => {
  const errors = {}
  fields.forEach(f => {
    if (!values[f] || String(values[f]).trim() === '') {
      errors[f] = 'This field is required'
    }
  })
  return errors
}

export const API_IMG = (path) =>
  path ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${path}` : null