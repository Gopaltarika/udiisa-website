import { Router } from 'express'
import * as ctrl from '../controllers/memberController.js'
import { authMiddleware } from '../middleware/auth.js'
import { uploadSingle } from '../middleware/upload.js'

const r = Router()
r.use(authMiddleware)

r.get('/summary', ctrl.getSummary)
r.get('/general', ctrl.getGeneralMembers)
r.post('/general', ctrl.addGeneralMember)
r.put('/general/:id', ctrl.updateGeneralMember)
r.delete('/general/:id', ctrl.deleteGeneralMember)

r.get('/special', ctrl.getSpecialMembers)
r.post('/special', uploadSingle('photo'), ctrl.addSpecialMember)
r.put('/special/:id', uploadSingle('photo'), ctrl.updateSpecialMember)
r.delete('/special/:id', ctrl.deleteSpecialMember)

r.get('/committee', ctrl.getCommittee)
r.post('/committee', uploadSingle('photo'), ctrl.addCommittee)
r.put('/committee/:id', uploadSingle('photo'), ctrl.updateCommittee)
r.delete('/committee/:id', ctrl.deleteCommittee)

export default r
