import Blog from '../models/Blog.js'

export const getBlogs = async (req, res) => {
  try {
    const { search } = req.query
    const filter = {}
    if (search && search.trim()) {
      filter.$or = [
        { heading: new RegExp(search, 'i') },
        { pageName: new RegExp(search, 'i') },
        { shortContent: new RegExp(search, 'i') },
      ]
    }
    const list = await Blog.find(filter).sort({ createdAt: -1 }).lean()
    const base = req.protocol + '://' + req.get('host')
    list.forEach(b => { if (b.image) b.image = base + b.image })
    return res.json(list)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch blogs' })
  }
}

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).lean()
    if (!blog) return res.status(404).json({ message: 'Blog not found' })
    const base = req.protocol + '://' + req.get('host')
    if (blog.image) blog.image = base + blog.image
    return res.json(blog)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to fetch blog' })
  }
}

export const addBlog = async (req, res) => {
  try {
    const { heading, pageName, shortContent, content } = req.body
    const image = req.file ? `/uploads/image/${req.file.filename}` : null
    const doc = await Blog.create({ heading, pageName, shortContent, content: content || '', image })
    const base = req.protocol + '://' + req.get('host')
    const out = doc.toObject()
    if (out.image) out.image = base + out.image
    return res.status(201).json(out)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to create blog' })
  }
}

export const updateBlog = async (req, res) => {
  try {
    const doc = await Blog.findById(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Blog not found' })
    const { heading, pageName, shortContent, content } = req.body
    if (heading !== undefined) doc.heading = heading
    if (pageName !== undefined) doc.pageName = pageName
    if (shortContent !== undefined) doc.shortContent = shortContent
    if (content !== undefined) doc.content = content
    if (req.file) doc.image = `/uploads/image/${req.file.filename}`
    await doc.save()
    const base = req.protocol + '://' + req.get('host')
    const out = doc.toObject()
    if (out.image) out.image = base + out.image
    return res.json(out)
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to update blog' })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    const doc = await Blog.findByIdAndDelete(req.params.id)
    if (!doc) return res.status(404).json({ message: 'Blog not found' })
    return res.json({ message: 'Deleted' })
  } catch (e) {
    return res.status(500).json({ message: e.message || 'Failed to delete' })
  }
}
