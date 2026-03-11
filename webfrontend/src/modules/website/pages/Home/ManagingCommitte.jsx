import React, { useEffect, useMemo, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { getPublicCommittees } from '@/shared/services/publicApi'

const ManagingCommittee = () => {
  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [committeeSlug, setCommitteeSlug] = useState('managing-community')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    const loadManagingCommittee = async () => {
      setLoading(true)
      try {
        const data = await getPublicCommittees()
        if (!active) return

        const committees = Array.isArray(data) ? data : []
        const managingCommittee = committees.find((c) => c.slug === 'managing-community')
          || committees.find((c) => String(c?.label || '').toLowerCase().includes('managing'))
          || committees[0]

        if (!managingCommittee) {
          setMembers([])
          return
        }

        setCommitteeSlug(managingCommittee.slug || 'managing-community')
        const mappedMembers = Array.isArray(managingCommittee.members)
          ? managingCommittee.members.map((m, index) => {
              const role = m.role || 'Member'
              const roleLower = role.toLowerCase()
              const isOrange = roleLower.includes('chairman') || roleLower.includes('president') || index < 2
              return {
                id: m._id || `${m.name}-${index}`,
                name: m.name || 'Member',
                role,
                img: m.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name || 'Member')}&background=F05A1A&color=fff&size=300`,
                isOrange,
              }
            })
          : []

        setMembers(mappedMembers)
      } catch {
        if (active) setMembers([])
      } finally {
        if (active) setLoading(false)
      }
    }

    loadManagingCommittee()
    return () => { active = false }
  }, [])

  const visibleMembers = useMemo(() => members.slice(0, 5), [members])

  return (
    <>
      <style>{`
        /* Card lift */
        .mc-card {
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease;
          cursor: default;
        }
        .mc-card:hover {
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 48px rgba(11,30,75,.13) !important;
        }

        /* Photo zoom */
        .mc-photo { transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .mc-card:hover .mc-photo { transform: scale(1.07); }

        /* Name underline */
        .mc-name-line { position: relative; display: inline-block; }
        .mc-name-line::after {
          content: '';
          position: absolute;
          bottom: -3px; left: 50%;
          transform: translateX(-50%);
          width: 0; height: 2px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          border-radius: 2px;
          transition: width .3s ease;
        }
        .mc-card:hover .mc-name-line::after { width: 100%; }

        /* View All button */
        .view-btn {
          position: relative; overflow: hidden;
          transition: all .28s cubic-bezier(.16,1,.3,1);
        }
        .view-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg,#1e40af,#2563EB);
          opacity: 0;
          transition: opacity .28s ease;
          z-index: 0;
        }
        .view-btn:hover::before { opacity: 1; }
        .view-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(37,99,235,.4) !important;
        }
        .view-btn span,
        .view-btn svg { position: relative; z-index: 1; }
        .btn-arrow { transition: transform .25s ease; }
        .view-btn:hover .btn-arrow { transform: translateX(4px); }
      `}</style>

      <section className="mc-section bg-white !py-[48px] sm:!py-[64px] lg:!py-[80px] !px-[16px] sm:!px-[24px] lg:!px-[32px]">
        <div className="max-w-[1280px] !mx-auto">

          {/* ── Header ── */}
          <div className="text-center !mb-[28px] sm:!mb-[36px] lg:!mb-[48px]">

            {/* Badge */}
            <div className="inline-flex items-center rounded-full !mb-[12px] sm:!mb-[16px] lg:!mb-[20px] !px-[14px] sm:!px-[18px] lg:!px-[20px] !py-[5px] sm:!py-[6px] bg-[rgba(240,90,26,.15)] border-[1.5px] border-[rgba(240,90,26,.45)] text-[#FF8C5A] text-[10px] sm:text-[11px] font-extrabold tracking-[2.5px] uppercase">
              Our Committee
            </div>

            {/* Heading */}
            <h2
              className="text-[#0B1E4B] !m-0 leading-[1.05] tracking-[2px] sm:tracking-[3px] lg:tracking-[4px]"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(30px,6vw,62px)',
              }}
            >
              Managing{' '}
              <span className="text-[#F05A1A]">Committee</span> of UDIISA
            </h2>
          </div>

          {/* ── Cards Grid ── */}
          {/* Mobile: 2-col | sm: 3-col | lg: 5-col */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 !gap-[10px] sm:!gap-[14px] lg:!gap-[20px] !mb-[24px] sm:!mb-[32px] lg:!mb-[40px] justify-items-center justify-center place-items-center">
            {visibleMembers.map((m) => (
              <div
                key={m.id}
                className="mc-card max-w-[330px] flex flex-col items-center text-center bg-white rounded-[14px] sm:rounded-[18px] lg:rounded-[20px] !p-[8px] sm:!p-[10px] lg:!p-[12px] shadow-[0_4px_16px_rgba(11,30,75,.07)] border border-slate-100"
              >
                {/* Photo */}
                <div
                  className="rounded-[10px] sm:rounded-[14px] lg:rounded-[16px] w-full overflow-hidden !mb-[8px] sm:!mb-[10px] lg:!mb-[14px] border border-[#e8ecf4] shadow-[0_4px_16px_rgba(11,30,75,.07)]"
                  style={{ aspectRatio: '3/3.5' }}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className="mc-photo w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(m.name)}&background=F05A1A&color=fff&size=300`
                    }}
                  />
                </div>

                {/* Name */}
                <h3 className="text-[#0B1E4B] font-extrabold leading-[1.25] !m-0 !mb-[4px] sm:!mb-[6px] text-[10.5px] sm:text-[12.5px] lg:text-[14px] w-full">
                  <span className="mc-name-line">{m.name}</span>
                </h3>

                {/* Role badge */}
                <span className={`
                  inline-flex items-center rounded-full
                  !px-[7px] sm:!px-[9px] lg:!px-[10px]
                  !py-[2px] sm:!py-[3px] lg:!py-[4px]
                  text-[8.5px] sm:text-[9.5px] lg:text-[10.5px]
                  font-extrabold tracking-[0.3px] capitalize
                  ${m.isOrange
                    ? 'bg-[rgba(240,90,26,.1)] text-[#F05A1A] border border-[rgba(240,90,26,.25)]'
                    : 'bg-[rgba(100,116,139,.08)] text-slate-500 border border-[rgba(100,116,139,.2)]'
                  }
                `}>
                  {m.role}
                </span>
              </div>
            ))}

            {!loading && visibleMembers.length === 0 && (
              <div className="col-span-full text-center text-slate-500 text-[13px] font-semibold !py-6">
                No committee members available.
              </div>
            )}
          </div>

          {/* ── View All Button ── */}
          <div className="flex justify-center">
            <button
              className="view-btn flex items-center !gap-[8px] sm:!gap-[10px] rounded-[12px] sm:rounded-[14px] border-0 cursor-pointer !px-[22px] sm:!px-[28px] lg:!px-[32px] !py-[10px] sm:!py-[12px] lg:!py-[13px] bg-[#2563EB] text-white text-[12.5px] sm:text-[13.5px] lg:text-[14px] font-extrabold shadow-[0_6px_20px_rgba(37,99,235,.32)] tracking-[0.3px]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              onClick={() => navigate(`/committee#${committeeSlug}`)}
            >
              <span>View All Members</span>
              <FaArrowRight className="btn-arrow text-[10px] sm:text-[11px] lg:text-[13px]" />
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default ManagingCommittee