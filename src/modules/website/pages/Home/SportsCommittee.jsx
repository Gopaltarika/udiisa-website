import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { BsStarFill } from 'react-icons/bs'

// ── Data (baad mein API se replace karein) ──
const committeeMembers = [
  {
    id: 1,
    name: 'Sachin Thakur',
    role: 'Cricket Expert',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=85&fit=crop&crop=face',
  },
  {
    id: 2,
    name: 'Meena Krishnan',
    role: 'Athletics Coach',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=85&fit=crop&crop=face',
  },
  {
    id: 3,
    name: 'Arjun Bhatt',
    role: 'Football Academy',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=85&fit=crop&crop=face',
  },
  {
    id: 4,
    name: 'Divya Menon',
    role: 'Badminton Trainer',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=85&fit=crop&crop=face',
  },
  {
    id: 5,
    name: 'Rohit Verma',
    role: 'Swimming Coach',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=85&fit=crop&crop=face',
  },
  {
    id: 6,
    name: 'Priya Nair',
    role: 'Gymnastics Expert',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=85&fit=crop&crop=face',
  },
]

const SportsCommittee = () => {
  return (
    <>
      <style>{`
        /* Swiper pagination dots */
        .sc-swiper .swiper-pagination { bottom: 0 !important; }
        .sc-swiper .swiper-pagination-bullet {
          width: 8px; height: 8px;
          background: #cbd5e1;
          opacity: 1;
          transition: all .25s ease;
        }
        .sc-swiper .swiper-pagination-bullet-active {
          background: #F05A1A;
          width: 24px;
          border-radius: 4px;
        }

        /* Card */
        .sc-card {
          transition: transform .32s cubic-bezier(.16,1,.3,1),
                      box-shadow .32s ease,
                      border-color .25s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .sc-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          border-radius: 0 0 20px 20px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .3s cubic-bezier(.16,1,.3,1);
        }
        .sc-card:hover::after { transform: scaleX(1); }
        .sc-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 24px 52px rgba(11,30,75,.13) !important;
          border-color: rgba(240,90,26,.25) !important;
        }

        /* Photo ring */
        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(240,90,26,.18), 0 0 0 6px rgba(240,90,26,.06); }
          50%      { box-shadow: 0 0 0 5px rgba(240,90,26,.28), 0 0 0 9px rgba(240,90,26,.1); }
        }
        .sc-photo-ring { animation: ringPulse 3s ease-in-out infinite; }

        /* Photo zoom */
        .sc-photo { transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .sc-card:hover .sc-photo { transform: scale(1.08); }

        /* Badge */
        .sc-badge {
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .sc-card:hover .sc-badge {
          transform: scale(1.06);
          box-shadow: 0 6px 18px rgba(240,90,26,.4) !important;
        }

        /* Name underline */
        .sc-name {
          position: relative; display: inline-block;
        }
        .sc-name::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 2px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          border-radius: 2px;
          transition: width .3s ease;
        }
        .sc-card:hover .sc-name::after { width: 100%; }

        /* Butterfly float */
        @keyframes floatBf {
          0%,100% { transform: translate(0,0) rotate(-5deg); }
          50%      { transform: translate(6px,-10px) rotate(6deg); }
        }
        .butterfly { animation: floatBf 4s ease-in-out infinite; }
      `}</style>

      <section
        className="sc-section !py-20 !px-4 sm:!px-6 lg:!px-8"
        style={{ background: 'linear-gradient(160deg,#EEF2FF 0%,#F4F6FB 50%,#EEF2FF 100%)' }}
      >
        <div className="!max-w-[1200px] !mx-auto">

          {/* ── Header ── */}
          <div className="!text-center !mb-12 !relative">

            {/* Pill badge */}
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
              Sports Division
            </div>

            {/* Heading */}
            <h2
              className="!m-0 !mb-3"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(36px,6vw,62px)',
                letterSpacing: 3, lineHeight: 1.05, color: '#0B1E4B',
              }}
            >
              Sports <span style={{ color: '#F05A1A' }}>Committee</span>
            </h2>

            {/* Underline */}
            <div
              className="!mx-auto"
              style={{
                width: 52, height: 4, borderRadius: 2,
                background: 'linear-gradient(90deg,#F05A1A,#FF7D42)',
              }}
            />
          </div>

          {/* ── Swiper Slider ── */}
          <Swiper
            className="sc-swiper !pb-10"
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              0:   { slidesPerView: 1 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024:{ slidesPerView: 4 },
            }}
          >
            {committeeMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div
                  className="sc-card !flex !flex-col !items-center !text-center !rounded-[20px] !bg-white !py-8 !px-5"
                  style={{
                    boxShadow: '0 4px 20px rgba(11,30,75,.07)',
                    border: '1px solid #e8ecf4',
                    minHeight: 260,
                  }}
                >
                  {/* Photo */}
                  <div
                    className="sc-photo-ring !rounded-full !overflow-hidden !mb-5 !flex-shrink-0"
                    style={{ width: 90, height: 90 }}
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="sc-photo !w-full !h-full !object-cover !object-top"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="!mt-0 !mb-1"
                    style={{
                      fontSize: 15, fontWeight: 800,
                      color: '#0B1E4B', lineHeight: 1.3,
                    }}
                  >
                    <span className="sc-name">{member.name}</span>
                  </h3>

                  {/* Role */}
                  <p
                    className="!mb-4 !mt-0"
                    style={{ fontSize: 12.5, color: '#64748b', fontWeight: 500 }}
                  >
                    {member.role}
                  </p>

                  {/* Badge */}
                  <div
                    className="sc-badge !inline-flex !items-center !gap-1.5 !rounded-full"
                    style={{
                      padding: '5px 14px',
                      background: 'rgba(240,90,26,.08)',
                      border: '1.5px solid rgba(240,90,26,.3)',
                      fontSize: 10,
                      fontWeight: 800,
                      color: '#F05A1A',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <BsStarFill style={{ fontSize: 8 }} />
                    Sports Committee
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>
    </>
  )
}

export default SportsCommittee