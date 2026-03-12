import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { FaArrowRight, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { getPublicBlogs } from '../../../../shared/services/publicApi'

const BlogSection = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    getPublicBlogs({ page: 1, limit: 8 })
      .then((data) => {
        if (cancelled) return
        const list = Array.isArray(data?.blogs) ? data.blogs : []
        setBlogs(list)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || 'Failed to load blogs')
          setBlogs([])
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <style>{`
        .blog-swiper .swiper-button-next,
        .blog-swiper .swiper-button-prev { display: none !important; }
        .blog-swiper .swiper-pagination { position: static !important; margin-top: 20px; }
        .blog-swiper .swiper-pagination-bullet { width: 7px; height: 7px; background: #cbd5e1; opacity: 1; transition: all .25s ease; }
        .blog-swiper .swiper-pagination-bullet-active { background: #F05A1A; width: 22px; border-radius: 4px; }

        .blog-nav-btn { transition: all .25s cubic-bezier(.16,1,.3,1); cursor: pointer; }
        .blog-nav-btn:hover { background: linear-gradient(135deg,#F05A1A,#FF7D42) !important; color: #fff !important; border-color: transparent !important; transform: scale(1.08); box-shadow: 0 8px 24px rgba(240,90,26,.35) !important; }

        .blog-card { transition: transform .32s cubic-bezier(.16,1,.3,1), box-shadow .32s ease, border-color .25s ease; cursor: pointer; position: relative; overflow: hidden; }
        .blog-card:hover { transform: translateY(-8px) !important; box-shadow: 0 24px 52px rgba(11,30,75,.13) !important; border-color: rgba(240,90,26,.2) !important; }
        .blog-img { transition: transform .45s cubic-bezier(.16,1,.3,1); }
        .blog-card:hover .blog-img { transform: scale(1.06); }
        .blog-overlay { transition: opacity .3s ease; opacity: 0; }
        .blog-card:hover .blog-overlay { opacity: 1; }
        .read-arrow { transition: transform .25s ease; }
        .blog-card:hover .read-arrow { transform: translateX(4px); }
        .blog-title { transition: color .2s ease; }
        .blog-card:hover .blog-title { color: #F05A1A !important; }

        .view-all-btn { position: relative; overflow: hidden; transition: all .28s cubic-bezier(.16,1,.3,1); }
        .view-all-btn::after { content: ''; position: absolute; top:0; left:-80%; width:60%; height:100%; background: linear-gradient(120deg,transparent,rgba(240,90,26,.1),transparent); transform: skewX(-15deg); transition: left .4s ease; }
        .view-all-btn:hover::after { left: 130%; }
        .view-all-btn:hover { background: #F05A1A !important; color: #fff !important; border-color: #F05A1A !important; transform: translateY(-2px); box-shadow: 0 12px 32px rgba(240,90,26,.3) !important; }
        .view-all-btn:hover .va-arrow { transform: translateX(4px); }
        .va-arrow { transition: transform .25s ease; }

        @media (max-width: 639px) {
          .blog-nav-btn { display: none !important; }
        }
      `}</style>

      <section className="blog-section !bg-[#F4F6FB] !py-[32px] sm:!py-[46px] lg:!py-[60px] !px-[12px] sm:!px-[24px] lg:!px-[32px]">
        <div className="!max-w-[1200px] !mx-auto">

          {/* Header */}
          <div className="!text-center !mb-[20px] sm:!mb-[36px] lg:!mb-[48px]">
            <div className="inline-flex items-center !rounded-full !mb-[8px] sm:!mb-[14px]" style={{ padding: '4px 14px', border: '1.5px solid rgba(240,90,26,.4)', background: 'rgba(240,90,26,.05)', fontSize: 10, fontWeight: 700, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#F05A1A' }}>
              Latest Updates
            </div>
            <h2 className="!m-0 !mb-[8px] sm:!mb-[10px]" style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(28px,6vw,62px)', letterSpacing: 3, lineHeight: 1.05, color: '#0B1E4B' }}>
              From Our <span style={{ color: '#F05A1A' }}>Blog</span>
            </h2>
            <div className="!mx-auto" style={{ width: 38, height: 3, borderRadius: 2, background: 'linear-gradient(90deg,#F05A1A,#FF7D42)' }} />
          </div>

          {/* Slider */}
          <div className="!relative">
            <button className="blog-nav-btn swiper-blog-prev !absolute !left-0 !top-[45%] -translate-y-1/2 -translate-x-4 !z-10 !hidden sm:!flex !items-center !justify-center !rounded-full !border-0 !cursor-pointer" style={{ width: 40, height: 40, background: '#fff', border: '1.5px solid #e2e8f0', color: '#0B1E4B', boxShadow: '0 4px 16px rgba(11,30,75,.1)' }}>
              <FaChevronLeft style={{ fontSize: 13 }} />
            </button>
            <button className="blog-nav-btn swiper-blog-next !absolute !right-0 !top-[45%] -translate-y-1/2 translate-x-4 !z-10 !hidden sm:!flex !items-center !justify-center !rounded-full !border-0 !cursor-pointer" style={{ width: 40, height: 40, background: '#fff', border: '1.5px solid #e2e8f0', color: '#0B1E4B', boxShadow: '0 4px 16px rgba(11,30,75,.1)' }}>
              <FaChevronRight style={{ fontSize: 13 }} />
            </button>

            <Swiper
              className="blog-swiper !px-[2px] !pb-[2px]"
              modules={[Pagination, Autoplay, Navigation]}
              pagination={{ clickable: true }}
              navigation={{ prevEl: '.swiper-blog-prev', nextEl: '.swiper-blog-next' }}
              autoplay={blogs.length > 1 ? { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
              loop={blogs.length > 1}
              breakpoints={{
                0:    { slidesPerView: 1,   spaceBetween: 10 },
                640:  { slidesPerView: 2,   spaceBetween: 16 },
                1024: { slidesPerView: 3,   spaceBetween: 20 },
              }}
            >
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <div className="blog-card !rounded-xl sm:!rounded-2xl !bg-white !overflow-hidden" style={{ boxShadow: '0 4px 20px rgba(11,30,75,.07)', border: '1px solid #e8ecf4' }} onClick={() => navigate(`/blogs/${blog.slug || blog.id}`)}>
                    <div className="!relative !overflow-hidden" style={{ height: 175 }}>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="blog-img !w-full !h-full !object-cover"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(blog.category || 'Blog')}&background=0B1E4B&color=fff&size=600`
                        }}
                      />
                      <div className="blog-overlay !absolute !inset-0" style={{ background: 'rgba(11,30,75,.25)' }} />
                      <div className="!absolute !top-[9px] !left-[9px]" style={{ padding: '3px 10px', background: 'rgba(11,30,75,.7)', backdropFilter: 'blur(6px)', borderRadius: 999, fontSize: 9.5, fontWeight: 700, color: '#fff', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        {blog.category}
                      </div>
                    </div>
                    <div className="!p-[12px] sm:!p-[16px]">
                      <div className="!mb-[4px]" style={{ fontSize: 10, fontWeight: 700, color: '#F05A1A', letterSpacing: '1.8px', textTransform: 'uppercase' }}>{blog.category}</div>
                      <h3 className="blog-title !mt-0 !mb-[5px] line-clamp-2" style={{ fontSize: 13, fontWeight: 800, color: '#0B1E4B', lineHeight: 1.4 }}>{blog.title}</h3>
                      <p className="!mt-0 !mb-[10px] line-clamp-2" style={{ fontSize: 11.5, color: '#64748b', lineHeight: 1.65 }}>{blog.excerpt}</p>
                      <div className="!flex !items-center !justify-between">
                        <div className="!flex !items-center !gap-[5px]" style={{ fontSize: 11, color: '#94a3b8', fontWeight: 500 }}>
                          <FaCalendarAlt style={{ fontSize: 10, color: '#F05A1A' }} />
                          {blog.date}
                        </div>
                        <div className="!flex !items-center !gap-[5px]" style={{ fontSize: 11.5, fontWeight: 700, color: '#F05A1A' }}>
                          Read More <FaArrowRight className="read-arrow" style={{ fontSize: 10 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {loading && (
              <div style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginTop: 12 }}>
                Loading blogs...
              </div>
            )}
            {!loading && error && (
              <div style={{ textAlign: 'center', color: '#b91c1c', fontSize: 13, marginTop: 12 }}>
                {error}
              </div>
            )}
            {!loading && !error && blogs.length === 0 && (
              <div style={{ textAlign: 'center', color: '#64748b', fontSize: 14, marginTop: 12 }}>
                No blogs available.
              </div>
            )}
          </div>

          {/* View All */}
          <div className="!flex !justify-center !mt-[20px] sm:!mt-[32px] lg:!mt-[40px]">
            <button className="view-all-btn !flex !items-center !gap-2 !rounded-full !cursor-pointer" style={{ padding: '10px 22px', background: 'transparent', border: '2px solid #F05A1A', fontSize: 13, fontWeight: 700, color: '#F05A1A', fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: '0.3px' }} onClick={() => navigate('/blogs')}>
              View All Blogs
              <FaArrowRight className="va-arrow" style={{ fontSize: 12 }} />
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default BlogSection