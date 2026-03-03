import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { BsStarFill } from 'react-icons/bs'

const committeeMembers = [
  { id: 1, name: 'Sachin Thakur',   role: 'Cricket Expert',     img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=85&fit=crop&crop=face' },
  { id: 2, name: 'Meena Krishnan',  role: 'Athletics Coach',    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=85&fit=crop&crop=face' },
  { id: 3, name: 'Arjun Bhatt',     role: 'Football Academy',   img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=85&fit=crop&crop=face' },
  { id: 4, name: 'Divya Menon',     role: 'Badminton Trainer',  img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=85&fit=crop&crop=face' },
  { id: 5, name: 'Rohit Verma',     role: 'Swimming Coach',     img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=85&fit=crop&crop=face' },
  { id: 6, name: 'Priya Nair',      role: 'Gymnastics Expert',  img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=85&fit=crop&crop=face' },
]

const SportsCommittee = () => {
  return (
    <>
      <style>{`
        .sc-swiper .swiper-pagination { bottom: 0 !important; }
        .sc-swiper .swiper-pagination-bullet {
          width: 7px; height: 7px; background: #cbd5e1; opacity: 1;
          transition: all .25s ease;
        }
        .sc-swiper .swiper-pagination-bullet-active {
          background: #F05A1A; width: 22px; border-radius: 4px;
        }

        .sc-card {
          transition: transform .32s cubic-bezier(.16,1,.3,1), box-shadow .32s ease, border-color .25s ease;
          cursor: default; position: relative; overflow: hidden;
        }
        .sc-card::after {
          content: ''; position: absolute;
          bottom: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          border-radius: 0 0 20px 20px;
          transform: scaleX(0); transform-origin: left;
          transition: transform .3s cubic-bezier(.16,1,.3,1);
        }
        .sc-card:hover::after { transform: scaleX(1); }
        .sc-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 24px 52px rgba(11,30,75,.13) !important;
          border-color: rgba(240,90,26,.25) !important;
        }

        @keyframes ringPulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(240,90,26,.18), 0 0 0 6px rgba(240,90,26,.06); }
          50%      { box-shadow: 0 0 0 5px rgba(240,90,26,.28), 0 0 0 9px rgba(240,90,26,.1); }
        }
        .sc-photo-ring { animation: ringPulse 3s ease-in-out infinite; }
        .sc-photo { transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .sc-card:hover .sc-photo { transform: scale(1.08); }

        .sc-badge { transition: transform .3s ease, box-shadow .3s ease; }
        .sc-card:hover .sc-badge {
          transform: scale(1.06);
          box-shadow: 0 6px 18px rgba(240,90,26,.4) !important;
        }

        .sc-name { position: relative; display: inline-block; }
        .sc-name::after {
          content: ''; position: absolute;
          bottom: -2px; left: 50%; transform: translateX(-50%);
          width: 0; height: 2px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          border-radius: 2px; transition: width .3s ease;
        }
        .sc-card:hover .sc-name::after { width: 100%; }

        @media (max-width: 479px) {
          .sc-card {
            padding: 16px 10px !important;
            border-radius: 14px !important;
          }
          .sc-photo-ring {
            width: 64px !important;
            height: 64px !important;
            margin-bottom: 10px !important;
          }
        }
      `}</style>

      <section
        className="sc-section !py-[32px] sm:!py-[56px] lg:!py-[80px] !px-[12px] sm:!px-[24px] lg:!px-[32px]"
        style={{ background: 'linear-gradient(160deg,#EEF2FF 0%,#F4F6FB 50%,#EEF2FF 100%)' }}
      >
        <div className="!max-w-[1200px] !mx-auto">

          {/* Header */}
          <div className="!text-center !mb-[20px] sm:!mb-[36px] lg:!mb-[48px]">

            <div
              className="inline-flex items-center !rounded-full !mb-[8px] sm:!mb-[14px]"
              style={{
                padding: '4px 14px',
                border: '1.5px solid rgba(240,90,26,.4)',
                background: 'rgba(240,90,26,.05)',
                fontSize: 10, fontWeight: 700,
                letterSpacing: '2.5px', textTransform: 'uppercase',
                color: '#F05A1A',
              }}
            >
              Sports Division
            </div>

            <h2
              className="!m-0 !mb-[8px] sm:!mb-[10px]"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(28px,6vw,62px)',
                letterSpacing: 3, lineHeight: 1.05, color: '#0B1E4B',
              }}
            >
              Sports <span style={{ color: '#F05A1A' }}>Committee</span> Of UDIISA
            </h2>

            <div
              className="!mx-auto"
              style={{ width: 38, height: 3, borderRadius: 2, background: 'linear-gradient(90deg,#F05A1A,#FF7D42)' }}
            />
          </div>

          {/* Swiper */}
          <Swiper
            className="sc-swiper !pb-[34px] sm:!pb-[40px]"
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop={true}
            breakpoints={{
              0:    { slidesPerView: 2, spaceBetween: 10 },
              768:  { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
          >
            {committeeMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div
                  className="sc-card !flex !flex-col !items-center !text-center !rounded-[20px] !bg-white !py-[20px] sm:!py-[28px] lg:!py-[32px] !px-[10px] sm:!px-[16px] lg:!px-[20px]"
                  style={{
                    boxShadow: '0 4px 20px rgba(11,30,75,.07)',
                    border: '1px solid #e8ecf4',
                  }}
                >
                  {/* Photo */}
                  <div
                    className="sc-photo-ring !rounded-full !overflow-hidden !mb-[10px] sm:!mb-[14px] !flex-shrink-0"
                    style={{ width: 72, height: 72 }}
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="sc-photo !w-full !h-full !object-cover !object-top"
                    />
                  </div>

                  {/* Name */}
                  <h3
                    className="!mt-0 !mb-[2px]"
                    style={{ fontSize: 12.5, fontWeight: 800, color: '#0B1E4B', lineHeight: 1.3 }}
                  >
                    <span className="sc-name">{member.name}</span>
                  </h3>

                  {/* Role */}
                  <p
                    className="!mb-[10px] sm:!mb-[14px] !mt-0"
                    style={{ fontSize: 11, color: '#64748b', fontWeight: 500 }}
                  >
                    {member.role}
                  </p>

                  {/* Badge */}
                  <div
                    className="sc-badge !inline-flex !items-center !gap-1 !rounded-full"
                    style={{
                      padding: '3px 9px',
                      background: 'rgba(240,90,26,.08)',
                      border: '1.5px solid rgba(240,90,26,.3)',
                      fontSize: 8.5, fontWeight: 800,
                      color: '#F05A1A',
                      letterSpacing: '1.2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <BsStarFill style={{ fontSize: 7 }} />
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