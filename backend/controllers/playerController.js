import Player from '../models/Player.js'
import { uploadImageFromFile } from '../utils/cloudinary.js'
import { toPublicMediaUrl } from '../utils/mediaUrl.js'

export const getPlayers = async (req, res) => {
  try {
    const { search } = req.query
    const filter = {}
    if (search && search.trim()) {
      filter.$or = [
        { playerName: new RegExp(search, 'i') },
        { sportsName: new RegExp(search, 'i') },
      ]
    }
    const list = await Player.find(filter).sort({ createdAt: -1 }).lean()
    list.forEach((p) => { p.photo = toPublicMediaUrl(req, p.photo) })
    return res.json(list)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch players' })
  }
}

export const getPlayer = async (req, res) => {
  try {
    const doc = await Player.findById(req.params.id).lean()
    if (!doc) return res.status(404).json({ message: 'Player not found' })
    doc.photo = toPublicMediaUrl(req, doc.photo)
    return res.json(doc)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch' })
  }
}

export const addPlayer = async (req, res) => {
  try {
    const { playerName, sportsName } = req.body
    const photo = req.file
      ? (await uploadImageFromFile(req.file, 'udiisa/players')) || `/uploads/image/${req.file.filename}`
      : null
    const doc = await Player.create({
      playerName: playerName || '',
      sportsName: sportsName || '',
      photo,
    })
    const out = doc.toObject()
    out.photo = toPublicMediaUrl(req, out.photo)
    return res.status(201).json(out)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to add' })
  }
}

export const updatePlayer = async (req, res) => {
  try {
    const doc = await Player.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    if (req.body.playerName !== undefined) doc.playerName = req.body.playerName
    if (req.body.sportsName !== undefined) doc.sportsName = req.body.sportsName
    if (req.file) {
      doc.photo =
        (await uploadImageFromFile(req.file, 'udiisa/players')) || `/uploads/image/${req.file.filename}`
    }
    await doc.save()
    const out = doc.toObject()
    out.photo = toPublicMediaUrl(req, out.photo)
    return res.json(out)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to update' })
  }
}

export const deletePlayer = async (req, res) => {
  try {
    const doc = await Player.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Not found' })
    return res.json({ message: 'Deleted' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to delete' })
  }
}
