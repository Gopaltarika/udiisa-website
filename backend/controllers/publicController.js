/**
 * Public API controller — no auth required.
 * Returns data in shapes expected by the website frontend.
 */

import Blog from '../models/Blog.js'
import CommitteeMember from '../models/CommitteeMember.js'
import CommitteeGroup from '../models/CommitteeGroup.js'
import SpecialMember from '../models/SpecialMember.js'
import GeneralMember from '../models/GeneralMember.js'
import Player from '../models/Player.js'
import mongoose from 'mongoose'
import { toPublicMediaUrl } from '../utils/mediaUrl.js'

const CATEGORY_TO_PAGE = {
  'success story': 'success-stories',
  event: 'events',
  initiative: 'initiatives',
  partnership: 'partnerships',
  mentorship: 'mentorship',
}

const PAGE_TO_CATEGORY = {
  home: 'General',
  general: 'General',
  events: 'Event',
  'success-stories': 'Success Story',
  initiatives: 'Initiative',
  partnerships: 'Partnership',
  mentorship: 'Mentorship',
}

function normalizeCategory(value = '') {
  return String(value).trim().toLowerCase()
}

// ─── Format date for frontend ─────────────────────────────
function formatDate(d) {
  if (!d) return { display: '', iso: '' }
  const date = new Date(d)
  const display = date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  const iso = date.toISOString().slice(0, 10)
  return { display, iso }
}

// ─── PUBLIC BLOGS ──────────────────────────────────────────
export const getPublicBlogs = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query
    const filter = {}
    if (search && search.trim()) {
      filter.$or = [
        { heading: new RegExp(search, 'i') },
        { pageName: new RegExp(search, 'i') },
        { shortContent: new RegExp(search, 'i') },
        { content: new RegExp(search, 'i') },
      ]
    }
    if (category && category.trim() && category !== 'All') {
      const normalized = normalizeCategory(category)
      const mappedPageName = CATEGORY_TO_PAGE[normalized]
      filter.$or = [
        { category: category.trim() },
        { category: new RegExp(`^${category.trim()}$`, 'i') },
        ...(mappedPageName ? [{ pageName: mappedPageName }] : []),
      ]
    }
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * Math.min(50, Math.max(1, parseInt(limit, 10)))
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)))
    const [list, total] = await Promise.all([
      Blog.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Blog.countDocuments(filter),
    ])
    const blogs = list.map((b) => {
      const { display, iso } = formatDate(b.createdAt)
      return {
        id: b._id.toString(),
        // Use unique id as slug so blog detail always opens the clicked post.
        slug: b._id.toString(),
        title: b.heading,
        category: b.category || PAGE_TO_CATEGORY[b.pageName] || 'General',
        excerpt: b.shortContent,
        image: toPublicMediaUrl(req, b.image),
        author: b.author || 'UDI Sports',
        authorImg: b.authorImg || null,
        date: display,
        dateISO: iso,
        readTime: b.readTime || '2 min read',
        tags: Array.isArray(b.tags) ? b.tags : [],
        content: b.content || '',
      }
    })
    return res.json({ blogs, total })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch blogs' })
  }
}

export const getPublicBlogBySlug = async (req, res) => {
  try {
    const slug = req.params.slug
    let blog = null

    // Primary: unique id-based routing (recommended by frontend).
    if (mongoose.Types.ObjectId.isValid(slug)) {
      blog = await Blog.findById(slug).lean()
    }

    // Backward compatibility for older links that used pageName.
    if (!blog) {
      blog = await Blog.findOne({ pageName: slug }).sort({ createdAt: -1 }).lean()
    }

    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    const { display, iso } = formatDate(blog.createdAt)
    const out = {
      id: blog._id.toString(),
      slug: blog._id.toString(),
      title: blog.heading,
      category: blog.category || PAGE_TO_CATEGORY[blog.pageName] || 'General',
      excerpt: blog.shortContent,
      image: toPublicMediaUrl(req, blog.image),
      author: blog.author || 'UDI Sports',
      authorImg: blog.authorImg || null,
      date: display,
      dateISO: iso,
      readTime: blog.readTime || '2 min read',
      tags: Array.isArray(blog.tags) ? blog.tags : [],
      content: blog.content || '',
    }
    return res.json(out)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch blog' })
  }
}

// ─── PUBLIC MEMBERS ───────────────────────────────────────
export const getPublicCommittee = async (req, res) => {
  try {
    const list = await CommitteeMember.find({}).sort({ createdAt: -1 }).lean()
    const members = list.map((m) => ({
      id: m._id.toString(),
      name: m.name,
      role: m.position,
      company: m.companyName || '',
      img: toPublicMediaUrl(req, m.photo) || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=F05A1A&color=fff&size=200`,
    }))
    return res.json(members)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch committee' })
  }
}

export const getPublicCommittees = async (req, res) => {
  try {
    const list = await CommitteeGroup.find({}).sort({ createdAt: -1 }).lean()
    const committees = list.map((c) => ({
      _id: c._id.toString(),
      slug: c.slug,
      label: c.label,
      shortLabel: c.shortLabel,
      icon: c.icon,
      role: c.role,
      description: c.description,
      cardVariant: c.cardVariant,
      members: Array.isArray(c.members)
        ? c.members.map((m) => ({
            _id: m._id?.toString?.() || null,
            name: m.name,
            role: m.role,
            company: m.company || '',
            image: toPublicMediaUrl(req, m.image),
          }))
        : [],
    }))
    return res.json(committees)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch committees' })
  }
}

export const getPublicSpecialMembers = async (req, res) => {
  try {
    const list = await SpecialMember.find({}).sort({ createdAt: -1 }).lean()
    const members = list.map((m) => ({
      id: m._id.toString(),
      name: m.name,
      companyName: m.companyName || '',
      designation: m.companyName || 'Special Member',
      membershipType: m.membershipCategory || 'Silver',
      membershipCategory: m.membershipCategory || 'Silver',
      img: toPublicMediaUrl(req, m.photo) || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=F05A1A&color=fff&size=200`,
    }))
    return res.json(members)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch special members' })
  }
}

export const getPublicGeneralMembers = async (req, res) => {
  try {
    const { type } = req.query
    const normalizedType = String(type || '').trim().toLowerCase()
    const typeMap = {
      corporate: 'body-corporate',
      'body-corporate': 'body-corporate',
      individual: 'individual',
    }
    const filter = normalizedType ? { type: typeMap[normalizedType] || 'individual' } : {}
    const list = await GeneralMember.find(filter).sort({ createdAt: -1 }).lean()
    const members = list.map((m) => {
      if (m.type === 'body-corporate') {
        return {
          id: m._id.toString(),
          name: m.contactPerson || m.name,
          company: m.companyName || '',
          sector: '-',
        }
      }
      return {
        id: m._id.toString(),
        name: m.name,
        company: m.companyName || '-',
        city: m.email || '-',
        sport: m.phone || '-',
      }
    })
    return res.json(members)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch general members' })
  }
}

// ─── PUBLIC PLAYERS ───────────────────────────────────────
export const getPublicPlayers = async (req, res) => {
  try {
    const list = await Player.find({}).sort({ createdAt: -1 }).lean()
    const players = list.map((p) => ({
      id: p._id.toString(),
      name: p.playerName,
      sport: p.sportsName,
      role: `${p.sportsName} Player`,
      achievement: p.achievement || '-',
      gender: p.gender || '-',
      photo: toPublicMediaUrl(req, p.photo),
    }))
    return res.json(players)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch players' })
  }
}
