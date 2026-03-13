// components/QuillEditor.jsx
// Drop-in replacement for TinyMCE — no API key required
import { useEffect, useRef } from 'react'

// v1.3.7 — stable, window.Quill works correctly
const QUILL_CSS = 'https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.snow.css'
const QUILL_JS  = 'https://cdn.jsdelivr.net/npm/quill@1.3.7/dist/quill.min.js'

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
    const s = document.createElement('script')
    s.src = src; s.onload = resolve; s.onerror = reject
    document.head.appendChild(s)
  })
}

function loadStyle(href) {
  if (document.querySelector(`link[href="${href}"]`)) return
  const l = document.createElement('link')
  l.rel = 'stylesheet'; l.href = href
  document.head.appendChild(l)
}

export default function QuillEditor({ value = '', onChange, height = 350 }) {
  const containerRef = useRef(null)
  const quillRef     = useRef(null)
  const skipRef      = useRef(false)  // prevent onChange → setValue loop

  useEffect(() => {
    let mounted = true

    const init = async () => {
      loadStyle(QUILL_CSS)
      await loadScript(QUILL_JS)
      if (!mounted || !containerRef.current || quillRef.current) return

      // v1.3.7: window.Quill is correctly set after script loads
      const QuillConstructor = window.Quill
      if (!QuillConstructor) return

      const quill = new QuillConstructor(containerRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ align: [] }],
            ['link', 'blockquote', 'code-block'],
            ['clean'],
          ],
        },
      })

      // Set initial HTML value
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value)
      }

      // v1.3.7 uses .root.innerHTML (not getSemanticHTML)
      quill.on('text-change', () => {
        if (skipRef.current) return
        const html = quill.root.innerHTML
        onChange?.(html === '<p><br></p>' ? '' : html)
      })

      quillRef.current = quill
    }

    init()
    return () => { mounted = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Sync external value changes (e.g. form reset) without loop
  useEffect(() => {
    const quill = quillRef.current
    if (!quill) return
    const current = quill.root.innerHTML
    const isEmpty = current === '<p><br></p>' || current === ''
    if (current === value || (isEmpty && !value)) return
    skipRef.current = true
    quill.clipboard.dangerouslyPasteHTML(value || '')
    setTimeout(() => { skipRef.current = false }, 0)
  }, [value])

  return (
    <div
      style={{ minHeight: height }}
      className="quill-wrapper rounded-[10px] border border-slate-200 overflow-hidden bg-white"
    >
      <div ref={containerRef} style={{ minHeight: height - 42 }} />

      <style>{`
        .quill-wrapper .ql-toolbar {
          border: none !important;
          border-bottom: 1px solid #e2e8f0 !important;
          background: #f8fafc;
          padding: 8px 10px;
        }
        .quill-wrapper .ql-container {
          border: none !important;
          font-size: 13.5px;
          font-family: inherit;
        }
        .quill-wrapper .ql-editor {
          min-height: ${height - 42}px;
          padding: 14px 16px;
          color: #334155;
          line-height: 1.7;
        }
        .quill-wrapper .ql-editor.ql-blank::before {
          color: #94a3b8;
          font-style: normal;
          font-size: 13.5px;
        }
        .quill-wrapper .ql-toolbar button:hover .ql-stroke,
        .quill-wrapper .ql-toolbar button.ql-active .ql-stroke {
          stroke: #F05A1A !important;
        }
        .quill-wrapper .ql-toolbar button:hover .ql-fill,
        .quill-wrapper .ql-toolbar button.ql-active .ql-fill {
          fill: #F05A1A !important;
        }
        .quill-wrapper .ql-toolbar .ql-picker-label:hover,
        .quill-wrapper .ql-toolbar .ql-picker-item:hover {
          color: #F05A1A !important;
        }
      `}</style>
    </div>
  )
}