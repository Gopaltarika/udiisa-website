// admin/pages/Blogs.jsx
import { useState, useEffect, useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
import Table from '../components/Table'
import Modal from '../components/Modal'
import SearchBar from '../components/SearchBar'
import ActionButtons from '../components/ActionButtons'
import ConfirmDialog from '../components/ConfirmDialog'
import PageHeader from '../components/PageHeader'
import { FormField, Input, Textarea, PhotoUpload, SubmitBtn, CancelBtn } from '../components/FormField'
import Badge from '../components/Badge'
import { useAdminToast } from '../hooks/ToastContext'
import { useDebounce } from '../hooks/useDebounce'
import blogService from '../services/blogService'
import { validateRequired, buildFormData, API_IMG, formatDate, truncate } from '../utils/helpers'

// NOTE: CKEditor — install with: npm install @ckeditor/ckeditor5-react @ckeditor/ckeditor5-classic-build
// Then import: import { CKEditor } from '@ckeditor/ckeditor5-react'; import ClassicEditor from '@ckeditor/ckeditor5-classic-build'
// Replace the <Textarea> below for content with <CKEditor>

const MOCK = [
  { id: 1, heading: 'Annual Sports Talent Hunt 2024', pageName: 'events', shortContent: 'Our biggest event with 5,000 athletes from 28 states.', content: '<p>Full content here...</p>', image: null, createdAt: '2024-12-10' },
  { id: 2, heading: "From Fields to Glory: India's Boxer", pageName: 'success-stories', shortContent: 'Young boxer clinches national gold medal.', content: '<p>Full content here...</p>', image: null, createdAt: '2024-12-05' },
  { id: 3, heading: 'Girl Empowerment Initiative Launches', pageName: 'initiatives', shortContent: 'New chapter for female athletes in India.', content: '<p>Full content here...</p>', image: null, createdAt: '2024-12-01' },
]

const PAGE_OPTIONS = ['home', 'events', 'success-stories', 'initiatives', 'partnerships', 'mentorship', 'general']

const EMPTY = { heading: '', pageName: '', shortContent: '', content: '', image: null }

export default function Blogs() {
  const toast = useAdminToast()
  const [blogs,    setBlogs]   = useState(MOCK)
  const [loading,  setLoading] = useState(false)
  const [saving,   setSaving]  = useState(false)
  const [deleting, setDeleting]= useState(false)
  const [search,   setSearch]  = useState('')
  const dSearch = useDebounce(search)
  const [formOpen, setFormOpen]= useState(false)
  const [viewOpen, setViewOpen]= useState(false)
  const [delOpen,  setDelOpen] = useState(false)
  const [selected, setSelected]= useState(null)
  const [form,     setForm]    = useState(EMPTY)
  const [preview,  setPreview] = useState(null)
  const [errors,   setErrors]  = useState({})

  const filtered = blogs.filter(b =>
    b.heading.toLowerCase().includes(dSearch.toLowerCase()) ||
    b.pageName.toLowerCase().includes(dSearch.toLowerCase())
  )

  const openAdd  = () => { setSelected(null); setForm(EMPTY); setPreview(null); setErrors({}); setFormOpen(true) }
  const openEdit = (row) => {
    setSelected(row)
    setForm({ heading: row.heading, pageName: row.pageName, shortContent: row.shortContent, content: row.content, image: null })
    setPreview(row.image ? API_IMG(row.image) : null)
    setErrors({})
    setFormOpen(true)
  }

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return }
    setForm(f => ({ ...f, image: file }))
    setPreview(URL.createObjectURL(file))
  }

  const validate = () => {
    const err = validateRequired(['heading', 'pageName', 'shortContent'], form)
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      if (selected) {
        // Real: await blogService.updateBlog(selected.id, buildFormData(form))
        setBlogs(prev => prev.map(b => b.id === selected.id ? { ...b, ...form } : b))
        toast.success('Blog updated successfully!')
      } else {
        const newB = { id: Date.now(), ...form, image: null, createdAt: new Date().toISOString() }
        setBlogs(prev => [newB, ...prev])
        toast.success('Blog published successfully!')
      }
      setFormOpen(false)
    } catch { toast.error('Failed to save blog') }
    finally { setSaving(false) }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      // await blogService.deleteBlog(selected.id)
      setBlogs(prev => prev.filter(b => b.id !== selected.id))
      toast.success('Blog deleted!')
      setDelOpen(false)
    } catch { toast.error('Failed to delete') }
    finally { setDeleting(false) }
  }

  const columns = [
    {
      key: 'image', label: '#',
      render: (v, row, i) => (
        <div className="flex items-center gap-[10px]">
          {v
            ? <img src={API_IMG(v)} className="w-[40px] h-[30px] rounded-[6px] object-cover" alt="" />
            : <div className="w-[40px] h-[30px] rounded-[6px] bg-gradient-to-br from-[#0B1E4B] to-[#F05A1A] flex items-center justify-center text-white text-[10px] font-extrabold">IMG</div>
          }
          <span className="text-slate-400 text-[11px]">#{i + 1}</span>
        </div>
      ),
    },
    { key: 'heading',      label: 'Heading',  render: (v) => <span className="font-semibold line-clamp-1 max-w-[220px] block">{v}</span> },
    { key: 'pageName',     label: 'Page',     render: (v) => <Badge variant="navy">{v}</Badge> },
    { key: 'shortContent', label: 'Excerpt',  render: (v) => <span className="text-slate-500 line-clamp-1 max-w-[200px] block text-[12px]">{v}</span> },
    { key: 'createdAt',    label: 'Published', render: (v) => formatDate(v) },
    {
      key: 'act', label: 'Actions',
      render: (_, row) => <ActionButtons onView={() => { setSelected(row); setViewOpen(true) }} onEdit={() => openEdit(row)} onDelete={() => { setSelected(row); setDelOpen(true) }} />,
    },
  ]

  return (
    <div>
      <PageHeader
        title="Blog Management"
        subtitle="Create, edit and manage blog posts"
        action={
          <button onClick={openAdd} className="flex items-center gap-[8px] px-[16px] h-[40px] rounded-[10px] bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] text-white text-[13px] font-extrabold shadow-[0_4px_14px_rgba(240,90,26,0.3)] hover:-translate-y-[1px] transition-all">
            <FaPlus className="text-[11px]" /> New Blog
          </button>
        }
      />
      <div className="mb-[16px]"><SearchBar value={search} onChange={setSearch} placeholder="Search blogs…" /></div>
      <Table columns={columns} data={filtered} loading={loading} emptyText="No blogs found" />

      {/* Form Modal */}
      <Modal isOpen={formOpen} onClose={() => setFormOpen(false)} title={`${selected ? 'Edit' : 'New'} Blog Post`} size="lg">
        <div className="flex flex-col gap-[16px]">
          <PhotoUpload label="Blog Cover Image" preview={preview} onChange={handlePhoto} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
            <FormField label="Blog Heading" required error={errors.heading}>
              <Input placeholder="Enter blog heading" value={form.heading} onChange={e => setForm(f => ({ ...f, heading: e.target.value }))} error={errors.heading} />
            </FormField>
            <FormField label="Page Name" required error={errors.pageName}>
              <select
                value={form.pageName}
                onChange={e => setForm(f => ({ ...f, pageName: e.target.value }))}
                className={`w-full h-[42px] px-[12px] rounded-[10px] border border-slate-200 bg-white text-[13.5px] font-medium text-slate-700 focus:outline-none focus:border-[#F05A1A] focus:ring-2 focus:ring-[#F05A1A]/10 transition-all ${errors.pageName ? 'border-red-400' : ''}`}
              >
                <option value="">Select page</option>
                {PAGE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </FormField>
          </div>

          <FormField label="Short Content (Card Excerpt)" required error={errors.shortContent}>
            <Textarea
              placeholder="Brief description shown on blog cards (2-3 sentences)"
              rows={2}
              value={form.shortContent}
              onChange={e => setForm(f => ({ ...f, shortContent: e.target.value }))}
              error={errors.shortContent}
            />
          </FormField>

          {/* CKEditor area — use Textarea as placeholder */}
          <FormField label="Full Blog Content (CKEditor)">
            <div className="rounded-[10px] border border-slate-200 overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-200 px-[12px] py-[8px] text-[11px] font-bold text-slate-500 uppercase tracking-[0.8px]">
                📝 CKEditor Integration Point
              </div>
              {/* 
                REPLACE this Textarea with CKEditor:
                
                import { CKEditor } from '@ckeditor/ckeditor5-react'
                import ClassicEditor from '@ckeditor/ckeditor5-classic-build'
                
                <CKEditor
                  editor={ClassicEditor}
                  data={form.content}
                  onChange={(_, editor) => setForm(f => ({ ...f, content: editor.getData() }))}
                />
              */}
              <Textarea
                placeholder="Full blog content goes here… (Replace with CKEditor: npm install @ckeditor/ckeditor5-react @ckeditor/ckeditor5-classic-build)"
                rows={8}
                value={form.content}
                onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
              />
            </div>
          </FormField>

          <div className="flex gap-[10px] justify-end pt-[6px]">
            <CancelBtn onClick={() => setFormOpen(false)} />
            <SubmitBtn loading={saving} onClick={handleSave}>{selected ? 'Update Blog' : 'Publish Blog'}</SubmitBtn>
          </div>
        </div>
      </Modal>

      {/* View Modal */}
      <Modal isOpen={viewOpen} onClose={() => setViewOpen(false)} title="Blog Details" size="lg">
        {selected && (
          <div className="flex flex-col gap-[16px]">
            {selected.image && (
              <img src={API_IMG(selected.image)} className="w-full h-[200px] object-cover rounded-[14px]" alt="" />
            )}
            <div className="flex items-center gap-[10px] flex-wrap">
              <Badge variant="navy">{selected.pageName}</Badge>
              <span className="text-[12px] text-slate-400">{formatDate(selected.createdAt)}</span>
            </div>
            <h2 className="text-[20px] font-extrabold text-[#0B1E4B] m-0">{selected.heading}</h2>
            <p className="text-[13.5px] text-slate-600 leading-relaxed m-0">{selected.shortContent}</p>
            {selected.content && (
              <div className="bg-slate-50 rounded-[12px] p-[16px]">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.8px] m-0 mb-[8px]">Full Content</p>
                <div className="text-[13.5px] text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: selected.content }} />
              </div>
            )}
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={delOpen} onClose={() => setDelOpen(false)} onConfirm={handleDelete} loading={deleting} message={`Delete blog "${selected?.heading}"?`} />
    </div>
  )
}