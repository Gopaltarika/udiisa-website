/**
 * BlogCard.jsx
 * SEO: uses <Link> (crawlable), semantic <article>/<h2>, descriptive alt text.
 */

import { Link } from 'react-router-dom'
import { FaCalendarAlt, FaClock, FaArrowRight } from 'react-icons/fa'
import { getCatColor } from './blogData'

export default function BlogCard ({ blog }) {
  const color = getCatColor(blog.category)
  const href = `/blogs/${blog.slug}`

  return (
    <article
      className="
        group relative flex items-start !gap-[18px]
        bg-white rounded-[18px]
        border-[1.5px] border-slate-100
        shadow-[0_2px_12px_rgba(11,30,75,0.06)]
        !p-[18px] overflow-hidden
        hover:shadow-[0_10px_36px_rgba(11,30,75,0.12),0_2px_10px_rgba(240,90,26,0.07)]
        hover:border-[rgba(240,90,26,0.22)]
        hover:-translate-y-[4px]
        transition-all duration-300
      "
      itemScope
      itemType="https://schema.org/BlogPosting"
    >
      <Link
        to={href}
        className="absolute inset-0 z-[1] rounded-[18px]"
        aria-label={`Read UDIISA blog: ${blog.title}`}
      />

      <div className="w-[110px] h-[90px] sm:w-[180px] sm:h-[120px] rounded-[12px] overflow-hidden flex-shrink-0 bg-slate-100 relative z-0">
        <img
          src={blog.image}
          alt={`${blog.title} — UDIISA blog`}
          loading="lazy"
          className="w-full h-full object-fill group-hover:scale-[1.08] transition-transform duration-500"
          decoding="async"
          itemProp="image"
          onError={e => {
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.category || 'UDIISA')}&background=0B1E4B&color=fff&size=300`
          }}
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col !gap-[6px] relative z-0 pointer-events-none">
        <span className={`
          inline-flex items-center self-start
          !px-[9px] !py-[3px] rounded-full
          text-[10px] font-extrabold uppercase tracking-[1.2px]
          border-[1.5px] ${color.bg} ${color.text} ${color.border}
        `}>
          {blog.category}
        </span>

        <h2
          className="
            text-[#0B1E4B] font-extrabold leading-snug !m-0
            text-[14.5px] sm:text-[15.5px]
            group-hover:text-[#F05A1A] transition-colors duration-200
            overflow-hidden line-clamp-2
          "
          itemProp="headline"
        >
          {blog.title}
        </h2>

        <p
          className="text-slate-500 text-[12.5px] leading-[1.6] !m-0 overflow-hidden line-clamp-2"
          itemProp="description"
        >
          {blog.excerpt}
        </p>

        <meta itemProp="author" content={blog.author || 'UDIISA'} />

        <div className="flex items-center !gap-[14px] !mt-[2px] flex-wrap">
          <span className="flex items-center !gap-[5px] text-[11px] text-slate-400 font-medium">
            <FaCalendarAlt className="text-[#F05A1A] text-[9px]" />
            <time itemProp="datePublished" dateTime={blog.dateISO || blog.date}>
              {blog.date}
            </time>
          </span>
          {blog.readTime && (
            <span className="flex items-center !gap-[5px] text-[11px] text-slate-400 font-medium">
              <FaClock className="text-[#F05A1A] text-[9px]" />
              {blog.readTime}
            </span>
          )}
          <span className="ml-auto flex items-center !gap-[5px] text-[11px] font-extrabold text-[#F05A1A] opacity-0 group-hover:opacity-100 transition-opacity">
            Read more <FaArrowRight className="text-[9px]" />
          </span>
        </div>
      </div>
    </article>
  )
}
