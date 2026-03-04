// admin/services/memberService.js
import api from './api'

const memberService = {
  // General Members
  getGeneralMembers:   (params) => api.get('/members/general', { params }),
  addGeneralMember:    (data)   => api.post('/members/general', data),
  updateGeneralMember: (id, data) => api.put(`/members/general/${id}`, data),
  deleteGeneralMember: (id)     => api.delete(`/members/general/${id}`),

  // Special Members
  getSpecialMembers:   (params) => api.get('/members/special', { params }),
  addSpecialMember:    (data)   => api.post('/members/special', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateSpecialMember: (id, data) => api.put(`/members/special/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteSpecialMember: (id)     => api.delete(`/members/special/${id}`),

  // Managing Committee
  getCommittee:   (params)    => api.get('/members/committee', { params }),
  addCommittee:   (data)      => api.post('/members/committee', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  updateCommittee:(id, data)  => api.put(`/members/committee/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  deleteCommittee:(id)        => api.delete(`/members/committee/${id}`),

  // Dashboard summary
  getSummary: () => api.get('/members/summary'),
}

export default memberService