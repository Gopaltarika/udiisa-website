export const isAbsoluteUrl = (value) => /^https?:\/\//i.test(String(value || ''))

export const toPublicMediaUrl = (req, value) => {
  if (!value) return null
  if (isAbsoluteUrl(value)) return value
  return `${req.protocol}://${req.get('host')}${value}`
}
