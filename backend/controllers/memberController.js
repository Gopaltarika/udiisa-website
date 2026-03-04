import GeneralMember from '../models/GeneralMember.js'
import SpecialMember from '../models/SpecialMember.js'
import CommitteeMember from '../models/CommitteeMember.js'

const baseUrl = (req) => req.protocol + '://' + req.get('host')

const withImage = (doc, req) => {
  const out = doc.toObject ? doc.toObject() : doc
  if (out.photo) out.photo = baseUrl(req) + out.photo
  return out
}

// ─── General Members ─────────────────────────────
export const getGeneralMembers = async (req, res) => {
  try {
    const { search, type } = req.query
    const filter = {}
    if (type) filter.type = type
    if (search && search.trim()) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { email: new RegExp(search, 'i') },
        { phone: new RegExp(search, 'i') },
        { companyName: new RegExp(search, 'i') },
        { contactPerson: new RegExp(search, 'i') },
      ]
    }
    const list = await GeneralMember.find(filter).sort({ createdAt: -1 }).lean()
    return res.json(list)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch members' })
  }
}

export const addGeneralMember = async (req, res) => {
  try {
    const { type, name, email, phone, companyName, contactPerson } = req.body
    const doc = await GeneralMember.create({
      type: type || 'individual',
      name: name || '',
      email: email || '',
      phone: phone || '',
      companyName: companyName || '',
      contactPerson: contactPerson || '',
    })
    return res.status(201).json(doc)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to add member' })
  }
}

export const updateGeneralMember = async (req, res) => {
  try {
    const doc = await GeneralMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!doc) return res.status(404).json({ message: 'Not found' })
    return res.json(doc)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to update' })
  }
}

export const deleteGeneralMember = async (req, res) => {
  try {
    const doc = await GeneralMember.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    return res.json({ message: 'Deleted' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to delete' })
  }
}

// ─── Special Members ─────────────────────────────
export const getSpecialMembers = async (req, res) => {
  try {
    const { search } = req.query
    const filter = {}
    if (search && search.trim()) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { companyName: new RegExp(search, 'i') },
      ]
    }
    const list = await SpecialMember.find(filter).sort({ createdAt: -1 }).lean()
    const base = baseUrl(req)
    list.forEach(m => { if (m.photo) m.photo = base + m.photo })
    return res.json(list)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch' })
  }
}

export const addSpecialMember = async (req, res) => {
  try {
    const { name, companyName } = req.body
    const photo = req.file ? `/uploads/image/${req.file.filename}` : null
    const doc = await SpecialMember.create({ name: name || '', companyName: companyName || '', photo })
    return res.status(201).json(withImage(doc, req))
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to add' })
  }
}

export const updateSpecialMember = async (req, res) => {
  try {
    const doc = await SpecialMember.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    if (req.body.name !== undefined) doc.name = req.body.name
    if (req.body.companyName !== undefined) doc.companyName = req.body.companyName
    if (req.file) doc.photo = `/uploads/image/${req.file.filename}`
    await doc.save()
    return res.json(withImage(doc, req))
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to update' })
  }
}

export const deleteSpecialMember = async (req, res) => {
  try {
    const doc = await SpecialMember.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    return res.json({ message: 'Deleted' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to delete' })
  }
}

// ─── Committee ───────────────────────────────────
export const getCommittee = async (req, res) => {
  try {
    const { search } = req.query
    const filter = {}
    if (search && search.trim()) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { position: new RegExp(search, 'i') },
        { companyName: new RegExp(search, 'i') },
      ]
    }
    const list = await CommitteeMember.find(filter).sort({ createdAt: -1 }).lean()
    const base = baseUrl(req)
    list.forEach(m => { if (m.photo) m.photo = base + m.photo })
    return res.json(list)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch' })
  }
}

export const addCommittee = async (req, res) => {
  try {
    const { name, position, companyName } = req.body
    const photo = req.file ? `/uploads/image/${req.file.filename}` : null
    const doc = await CommitteeMember.create({
      name: name || '',
      position: position || '',
      companyName: companyName || '',
      photo,
    })
    return res.status(201).json(withImage(doc, req))
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to add' })
  }
}

export const updateCommittee = async (req, res) => {
  try {
    const doc = await CommitteeMember.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    if (req.body.name !== undefined) doc.name = req.body.name
    if (req.body.position !== undefined) doc.position = req.body.position
    if (req.body.companyName !== undefined) doc.companyName = req.body.companyName
    if (req.file) doc.photo = `/uploads/image/${req.file.filename}`
    await doc.save()
    return res.json(withImage(doc, req))
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to update' })
  }
}

export const deleteCommittee = async (req, res) => {
  try {
    const doc = await CommitteeMember.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    return res.json({ message: 'Deleted' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to delete' })
  }
}

export const getSummary = async (req, res) => {
  try {
    const [general, special, committee] = await Promise.all([
      GeneralMember.countDocuments(),
      SpecialMember.countDocuments(),
      CommitteeMember.countDocuments(),
    ])
    return res.json({ general, special, committee })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed' })
  }
}
