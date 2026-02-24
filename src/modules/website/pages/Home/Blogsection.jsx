import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { FaArrowRight, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// ── Data (baad mein API se replace karein) ──
const blogs = [
  {
    id: 1,
    category: 'Initiative',
    title: 'Breaking Barriers: Girl Empowerment Initiative Launches',
    desc: 'A new chapter begins as we dedicate resources to female athletes facing systemic barriers...',
    date: 'Dec 5, 2024',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=85&fit=crop',
  },
  {
    id: 2,
    category: 'Partnership',
    title: 'Partnership with 10 Top Academies Opens New Doors',
    desc: 'Major academies have agreed to provide subsidized training for SportForce athletes...',
    date: 'Nov 28, 2024',
    img: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=85&fit=crop',
  },
  {
    id: 3,
    category: 'Mentorship',
    title: 'Olympians Join Our Mentorship Program',
    desc: 'Former Olympians and national champions join our mentorship program to inspire young talents...',
    date: 'Nov 20, 2024',
    img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=85&fit=crop',
  },
  {
    id: 4,
    category: 'Achievement',
    title: 'Our Athletes Win 12 Medals at National Championship',
    desc: 'A historic moment as SportForce athletes bring home medals from across disciplines...',
    date: 'Nov 10, 2024',
    img: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=85&fit=crop',
  },
  {
    id: 5,
    category: 'Event',
    title: 'Annual Sports Carnival 2024 Concludes Successfully',
    desc: 'Thousands of young athletes participated in our biggest annual event to date...',
    date: 'Oct 30, 2024',
    img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&q=85&fit=crop',
  },
  {
    id: 6,
    category: 'Community',
    title: 'Grassroots Scouting Drive Reaches 5 New States',
    desc: 'Our talent identification drive now covers 28 states with fresh scouting in remote areas...',
    date: 'Oct 18, 2024',
    img: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=600&q=85&fit=crop',
  },
]

const BlogSection = () => {
  const navigate = useNavigate()

  return (
    <>
      <style>{`
        /* Hide default swiper nav, use custom */
        .blog-swiper .swiper-button-next,
        .blog-swiper .swiper-button-prev { display: none !important; }

        /* Pagination dots */
        .blog-swiper .swiper-pagination { position: static !important; margin-top: 28px; }
        .blog-swiper .swiper-pagination-bullet {
          width: 8px; height: 8px;
          background: #cbd5e1; opacity: 1;
          transition: all .25s ease;
        }
        .blog-swiper .swiper-pagination-bullet-active {
          background: #F05A1A; width: 24px; border-radius: 4px;
        }

        /* Custom nav buttons */
        .blog-nav-btn {
          transition: all .25s cubic-bezier(.16,1,.3,1);
          cursor: pointer;
        }
        .blog-nav-btn:hover {
          background: linear-gradient(135deg,#F05A1A,#FF7D42) !important;
          color: #fff !important;
          border-color: transparent !important;
          transform: scale(1.08);
          box-shadow: 0 8px 24px rgba(240,90,26,.35) !important;
        }

        /* Blog card */
        .blog-card {
          transition: transform .32s cubic-bezier(.16,1,.3,1), box-shadow .32s ease, border-color .25s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .blog-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 24px 52px rgba(11,30,75,.13) !important;
          border-color: rgba(240,90,26,.2) !important;
        }

        /* Image zoom */
        .blog-img {
          transition: transform .45s cubic-bezier(.16,1,.3,1);
        }
        .blog-card:hover .blog-img { transform: scale(1.06); }

        /* Image overlay intensify */
        .blog-overlay {
          transition: opacity .3s ease;
          opacity: 0;
        }
        .blog-card:hover .blog-overlay { opacity: 1; }

        /* Read More arrow */
        .read-arrow { transition: transform .25s ease; }
        .blog-card:hover .read-arrow { transform: translateX(4px); }

        /* Title hover color */
        .blog-title { transition: color .2s ease; }
        .blog-card:hover .blog-title { color: #F05A1A !important; }

        /* View All button */
        .view-all-btn {
          position: relative; overflow: hidden;
          transition: all .28s cubic-bezier(.16,1,.3,1);
        }
        .view-all-btn::after {
          content: '';
          position: absolute; top:0; left:-80%; width:60%; height:100%;
          background: linear-gradient(120deg,transparent,rgba(240,90,26,.1),transparent);
          transform: skewX(-15deg);
          transition: left .4s ease;
        }
        .view-all-btn:hover::after { left: 130%; }
        .view-all-btn:hover {
          background: #F05A1A !important;
          color: #fff !important;
          border-color: #F05A1A !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(240,90,26,.3) !important;
        }
        .view-all-btn:hover .va-arrow { transform: translateX(4px); }
        .va-arrow { transition: transform .25s ease; }
      `}</style>

      <section className="blog-section !bg-[#F4F6FB] !py-20 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-[1200px] !mx-auto">

          {/* ── Header ── */}
          <div className="!text-center !mb-12">
            <div
              className="inline-flex items-center !rounded-full !mb-5"
              style={{
                padding: '5px 18px',
                border: '1.5px solid rgba(240,90,26,.4)',
                background: 'rgba(240,90,26,.05)',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '2.5px', textTransform: 'uppercase',
                color: '#F05A1A',
              }}
            >
              Latest Updates
            </div>

            <h2
              className="!m-0 !mb-3"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(36px,6vw,62px)',
                letterSpacing: 3, lineHeight: 1.05, color: '#0B1E4B',
              }}
            >
              From Our <span style={{ color: '#F05A1A' }}>Blog</span>
            </h2>

            <div
              className="!mx-auto"
              style={{
                width: 52, height: 4, borderRadius: 2,
                background: 'linear-gradient(90deg,#F05A1A,#FF7D42)',
              }}
            />
          </div>

          {/* ── Slider + Nav ── */}
          <div className="!relative">

            {/* Custom Prev Button */}
            <button
              className="blog-nav-btn swiper-blog-prev !absolute !left-0 !top-1/2 -translate-y-1/2 -translate-x-4 !z-10
                         !flex !items-center !justify-center !rounded-full !border-0 !cursor-pointer"
              style={{
                width: 44, height: 44,
                background: '#fff',
                border: '1.5px solid #e2e8f0',
                color: '#0B1E4B',
                boxShadow: '0 4px 16px rgba(11,30,75,.1)',
              }}
            >
              <FaChevronLeft style={{ fontSize: 14 }} />
            </button>

            {/* Custom Next Button */}
            <button
              className="blog-nav-btn swiper-blog-next !absolute !right-0 !top-1/2 -translate-y-1/2 translate-x-4 !z-10
                         !flex !items-center !justify-center !rounded-full !border-0 !cursor-pointer"
              style={{
                width: 44, height: 44,
                background: '#fff',
                border: '1.5px solid #e2e8f0',
                color: '#0B1E4B',
                boxShadow: '0 4px 16px rgba(11,30,75,.1)',
              }}
            >
              <FaChevronRight style={{ fontSize: 14 }} />
            </button>

            <Swiper
              className="blog-swiper !px-1 !pb-2"
              modules={[Pagination, Autoplay, Navigation]}
              pagination={{ clickable: true }}
              navigation={{
                prevEl: '.swiper-blog-prev',
                nextEl: '.swiper-blog-next',
              }}
              autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              loop={true}
              spaceBetween={20}
              breakpoints={{
                0:    { slidesPerView: 1 },
                640:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {blogs.map((blog) => (
                <SwiperSlide key={blog.id}>
                  <div
                    className="blog-card !rounded-2xl !bg-white !overflow-hidden"
                    style={{
                      boxShadow: '0 4px 20px rgba(11,30,75,.07)',
                      border: '1px solid #e8ecf4',
                    }}
                    onClick={() => navigate(`/blogs/${blog.id}`)}
                  >
                    {/* Image */}
                    <div className="!relative !overflow-hidden" style={{ height: 200 }}>
                      <img
                        src={blog.img}
                        alt={blog.title}
                        className="blog-img !w-full !h-full !object-cover"
                      />
                      {/* Hover overlay */}
                      <div
                        className="blog-overlay !absolute !inset-0"
                        style={{ background: 'rgba(11,30,75,.25)' }}
                      />
                      {/* Category badge on image */}
                      <div
                        className="!absolute !top-3 !left-3"
                        style={{
                          padding: '4px 12px',
                          background: 'rgba(11,30,75,.7)',
                          backdropFilter: 'blur(6px)',
                          borderRadius: 999,
                          fontSize: 10, fontWeight: 700,
                          color: '#fff', letterSpacing: '1.5px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {blog.category}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="!p-5">
                      {/* Category text */}
                      <div
                        className="!mb-2"
                        style={{
                          fontSize: 10.5, fontWeight: 700,
                          color: '#F05A1A', letterSpacing: '1.8px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {blog.category}
                      </div>

                      {/* Title */}
                      <h3
                        className="blog-title !mt-0 !mb-2 line-clamp-1"
                        style={{
                          fontSize: 15, fontWeight: 800,
                          color: '#0B1E4B', lineHeight: 1.4,
                        }}
                      >
                        {blog.title}
                      </h3>

                      {/* Desc */}
                      <p
                        className="!mt-0 !mb-4"
                        style={{
                          fontSize: 13, color: '#64748b',
                          lineHeight: 1.7,
                        }}
                      >
                        {blog.desc}
                      </p>

                      {/* Footer: date + read more */}
                      <div className="!flex !items-center !justify-between">
                        <div
                          className="!flex !items-center !gap-1.5"
                          style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}
                        >
                          <FaCalendarAlt style={{ fontSize: 11, color: '#F05A1A' }} />
                          {blog.date}
                        </div>
                        <div
                          className="!flex !items-center !gap-1.5"
                          style={{ fontSize: 13, fontWeight: 700, color: '#F05A1A' }}
                        >
                          Read More
                          <FaArrowRight className="read-arrow" style={{ fontSize: 11 }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* ── View All Blogs Button ── */}
          <div className="!flex !justify-center !mt-10">
            <button
              className="view-all-btn !flex !items-center !gap-2.5 !rounded-full !cursor-pointer"
              style={{
                padding: '13px 32px',
                background: 'transparent',
                border: '2px solid #F05A1A',
                fontSize: 14, fontWeight: 700,
                color: '#F05A1A',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                letterSpacing: '0.3px',
              }}
              onClick={() => navigate('/blogs')}
            >
              View All Blogs
              <FaArrowRight className="va-arrow" style={{ fontSize: 13 }} />
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default BlogSection