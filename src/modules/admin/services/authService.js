// admin/services/authService.js
import api from './api'

const authService = {
  login:           (data)  => api.post('/auth/login', data),
  logout:          ()      => api.post('/auth/logout'),
  changePassword:  (data)  => api.put('/auth/change-password', data),
  forgotPassword:  (email) => api.post('/auth/forgot-password', { email }),
  getProfile:      ()      => api.get('/auth/profile'),
}

export default authService