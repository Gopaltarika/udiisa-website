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
        const managingCommittee =
          committees.find((c) => c.slug === 'managing-community') ||
          committees.find((c) => String(c?.label || '').toLowerCase().includes('managing')) ||
          committees[0]

        if (!managingCommittee) { setMembers([]); return }

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
  const topTwo    = visibleMembers.slice(0, 2)
  const bottomThree = visibleMembers.slice(2, 5)

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
          box-shadow: 0 24px 56px rgba(11,30,75,.14) !important;
        }

        /* Photo zoom */
        .mc-photo { transition: transform .4s cubic-bezier(.16,1,.3,1); }
        .mc-card:hover .mc-photo { transform: scale(1.06); }

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
        .view-btn span, .view-btn svg { position: relative; z-index: 1; }
        .btn-arrow { transition: transform .25s ease; }
        .view-btn:hover .btn-arrow { transform: translateX(4px); }

        /* Top-2 row */
        .mc-top-row {
          display: flex;
          justify-content: center;
          gap: 20px;
        }
        .mc-top-row .mc-card-wrap {
          width: clamp(160px, 22vw, 240px);
        }

        /* Bottom-3 row */
        .mc-bottom-row {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 16px;
        }
        .mc-bottom-row .mc-card-wrap {
          width: clamp(140px, 20vw, 210px);
        }

        /* Connector line between rows */
        .mc-connector {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin: 0 auto;
          width: fit-content;
          position: relative;
        }
        .mc-connector-line {
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(240,90,26,.25), rgba(240,90,26,.25), transparent);
          flex: 1;
        }
        .mc-connector-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #F05A1A;
          opacity: .4;
          flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .mc-top-row { gap: 10px; }
          .mc-top-row .mc-card-wrap { width: calc(50% - 5px); }
          .mc-bottom-row { gap: 8px; flex-wrap: nowrap; }
          .mc-bottom-row .mc-card-wrap { width: calc(33.33% - 6px); }
        }
      `}</style>

      <section className="bg-white !py-[48px] sm:!py-[50px] lg:!py-[66px] !px-[16px] sm:!px-[24px] lg:!px-[32px]">
        <div className="max-w-[1100px] !mx-auto">

          {/* ── Header ── */}
          <div className="text-center !mb-[32px] sm:!mb-[40px] lg:!mb-[52px]">
            <div className="inline-flex items-center rounded-full !mb-[12px] !px-[16px] !py-[5px] bg-[rgba(240,90,26,.12)] border-[1.5px] border-[rgba(240,90,26,.4)] text-[#F05A1A] text-[10px] sm:text-[11px] font-extrabold tracking-[2.5px] uppercase">
              Our Committee
            </div>
            <h2
              className="text-[#0B1E4B] !m-0 leading-[1.05]"
              style={{ fontFamily: "'Bebas Neue', cursive", fontSize: 'clamp(30px,6vw,62px)', letterSpacing: 'clamp(2px,0.5vw,4px)' }}
            >
              Managing{' '}
              <span className="text-[#F05A1A]">Committee</span> of UDIISA
            </h2>
            <p className="!mt-[10px] !mb-0 text-slate-400 text-[13px] sm:text-[14px] font-medium max-w-[460px] !mx-auto leading-relaxed">
              The dedicated leaders steering our mission forward
            </p>
          </div>

          {/* ── 5-Member Layout ── */}
          {!loading && visibleMembers.length > 0 && (
            <div className="!mb-[28px] sm:!mb-[36px] lg:!mb-[44px]">

              {/* Top Row — 2 prominent members */}
              <div className="mc-top-row">
                {topTwo.map((m) => (
                  <MemberCard key={m.id} m={m} size="lg" />
                ))}
              </div>

              {/* Connector */}
              {bottomThree.length > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto', padding: '10px 0 6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 'clamp(200px, 40%, 400px)' }}>
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(240,90,26,.2))' }} />
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F05A1A', opacity: .4 }} />
                    <div style={{ flex: 1, height: 1, background: 'rgba(240,90,26,.15)' }} />
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#F05A1A', opacity: .4 }} />
                    <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(240,90,26,.2), transparent)' }} />
                  </div>
                </div>
              )}

              {/* Bottom Row — 3 members */}
              {bottomThree.length > 0 && (
                <div className="mc-bottom-row">
                  {bottomThree.map((m) => (
                    <MemberCard key={m.id} m={m} size="sm" />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center !py-16 !gap-3">
              <div style={{ width: 20, height: 20, border: '2.5px solid #e2e8f0', borderTopColor: '#F05A1A', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
              <span className="text-slate-400 text-[13px] font-medium">Loading committee...</span>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {/* Empty */}
          {!loading && visibleMembers.length === 0 && (
            <div className="text-center text-slate-400 text-[14px] font-semibold !py-10">
              No committee members available.
            </div>
          )}

          {/* ── View All Button ── */}
          <div className="flex justify-center">
            <button
              className="view-btn flex items-center !gap-[8px] sm:!gap-[10px] rounded-[12px] sm:rounded-[14px] border-0 cursor-pointer !px-[24px] sm:!px-[30px] !py-[11px] sm:!py-[13px] bg-[#2563EB] text-white text-[12.5px] sm:text-[13.5px] font-extrabold shadow-[0_6px_20px_rgba(37,99,235,.3)] tracking-[0.3px]"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              onClick={() => navigate(`/committee#${committeeSlug}`)}
            >
              <span>View All Members</span>
              <FaArrowRight className="btn-arrow text-[11px] sm:text-[12px]" />
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

/* ── Member Card Component ── */
const MemberCard = ({ m, size }) => {
  const isLg = size === 'lg'

  return (
    <div className="mc-card-wrap">
      <div
        className={`mc-card flex flex-col items-center text-center bg-white rounded-[16px] sm:rounded-[20px] border border-slate-100 shadow-[0_4px_18px_rgba(11,30,75,.07)] overflow-hidden`}
        style={{ padding: isLg ? 'clamp(10px,1.5vw,16px)' : 'clamp(8px,1.2vw,12px)' }}
      >
        {/* Photo */}
        <div
          className="w-full overflow-hidden rounded-[10px] sm:rounded-[14px] border border-[#edf0f7] shadow-[0_2px_10px_rgba(11,30,75,.07)]"
          style={{
            aspectRatio: '3/3.6',
            marginBottom: isLg ? 'clamp(8px,1.2vw,14px)' : 'clamp(6px,1vw,10px)',
          }}
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
        <h3
          className="text-[#0B1E4B] font-extrabold leading-[1.2] !m-0 w-full"
          style={{
            fontSize: isLg ? 'clamp(11px,1.4vw,15px)' : 'clamp(10px,1.2vw,13px)',
            marginBottom: isLg ? 6 : 4,
          }}
        >
          <span className="mc-name-line">{m.name}</span>
        </h3>

        {/* Role badge */}
        <span
          className={`inline-flex items-center rounded-full font-extrabold capitalize ${
            m.isOrange
              ? 'bg-[rgba(240,90,26,.1)] text-[#F05A1A] border border-[rgba(240,90,26,.22)]'
              : 'bg-[rgba(100,116,139,.07)] text-slate-500 border border-[rgba(100,116,139,.18)]'
          }`}
          style={{
            fontSize: isLg ? 'clamp(8px,0.9vw,11px)' : 'clamp(7.5px,0.8vw,10px)',
            padding: isLg ? '3px 10px' : '2px 8px',
            letterSpacing: '0.2px',
          }}
        >
          {m.role}
        </span>
      </div>
    </div>
  )
}

export default ManagingCommittee