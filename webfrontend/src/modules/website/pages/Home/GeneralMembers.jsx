import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { getPublicGeneralMembers } from '../../../../shared/services/publicApi'

const tabs = [
  { key: 'individual', label: 'Individual' },
  { key: 'corporate',  label: 'Body Corporate' },
]

const GeneralMembers = () => {
  const [activeTab, setActiveTab] = useState('individual')
  const [individualMembers, setIndividualMembers] = useState([])
  const [corporateMembers, setCorporateMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const data = activeTab === 'individual' ? individualMembers : corporateMembers

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    Promise.all([
      getPublicGeneralMembers('individual'),
      getPublicGeneralMembers('corporate'),
    ])
      .then(([individualData, corporateData]) => {
        if (cancelled) return
        setIndividualMembers(Array.isArray(individualData) ? individualData : [])
        setCorporateMembers(Array.isArray(corporateData) ? corporateData : [])
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.message || 'Failed to load general members')
          setIndividualMembers([])
          setCorporateMembers([])
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
        /* Tab */
        .gm-tab {
          transition: all .22s ease;
          cursor: pointer;
          position: relative;
        }
        .gm-tab::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          border-radius: 2px;
          transform: scaleX(0);
          transition: transform .25s ease;
        }
        .gm-tab.active::after  { transform: scaleX(1); }
        .gm-tab:hover::after   { transform: scaleX(1); }

        /* Table row hover */
        .gm-row {
          transition: background .15s ease;
          cursor: default;
        }
        .gm-row:hover { background: #FFF3EC !important; }
        .gm-row:hover .gm-row-name { color: #F05A1A !important; }
        .gm-row:hover .gm-row-sr   { color: #F05A1A !important; font-weight: 700 !important; }

        /* View All button */
        .view-btn {
          position: relative; overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .view-btn::after {
          content: '';
          position: absolute; top:0; left:-80%; width:60%; height:100%;
          background: linear-gradient(120deg,transparent,rgba(255,255,255,.15),transparent);
          transform: skewX(-15deg);
          transition: left .4s ease;
        }
        .view-btn:hover::after { left: 130%; }
        .view-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(11,30,75,.3) !important;
        }
        .view-btn:hover .btn-arrow { transform: translateX(4px); }
        .btn-arrow { transition: transform .25s ease; }

        /* Tab content fade */
        @keyframes tabFade {
          from { opacity:0; transform: translateY(6px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .tab-content { animation: tabFade .25s ease both; }

        /* ── Mobile styles ── */
        @media (max-width: 639px) {

          /* Table: hide company column, show as sub-text under name */
          .gm-col-company { display: none !important; }

          .gm-table-header {
            grid-template-columns: 40px 1fr !important;
            padding: 10px 12px !important;
          }

          .gm-table-row {
            grid-template-columns: 40px 1fr !important;
            padding: 10px 12px !important;
          }

          .gm-row-name-wrap {
            display: flex !important;
            flex-direction: column !important;
            gap: 2px !important;
          }

          .gm-row-company-sub {
            display: block !important;
            font-size: 11px !important;
            color: #94a3b8 !important;
            font-weight: 500 !important;
          }
        }
      `}</style>

      <section className="gm-section !bg-[#F4F6FB] !py-[36px] sm:!py-[46px] lg:!py-[60px] !px-[12px] sm:!px-[24px] lg:!px-[32px]">
        <div className="!max-w-[1100px] !mx-auto">

          {/* ── Header ── */}
          <div className="!text-center !mb-[20px] sm:!mb-[32px] lg:!mb-[40px]">

            {/* Badge */}
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
              Directory
            </div>

            <h2
              className="!m-0 !mb-[8px] sm:!mb-[12px]"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(28px,6vw,60px)',
                letterSpacing: 3, lineHeight: 1.05, color: '#0B1E4B',
              }}
            >
              General <span style={{ color: '#F05A1A' }}>Members</span> Of UDIISA
            </h2>

            <div
              className="!mx-auto"
              style={{
                width: 40, height: 3, borderRadius: 2,
                background: 'linear-gradient(90deg,#F05A1A,#FF7D42)',
              }}
            />
          </div>

          {/* ── Tabs ── */}
          <div
            className="!flex !items-center !mb-[14px] sm:!mb-[20px]"
            style={{ borderBottom: '2px solid #e2e8f0' }}
          >
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`gm-tab !border-0 !bg-transparent !cursor-pointer !pb-[10px] sm:!pb-[12px] !mr-[16px] sm:!mr-[24px] ${activeTab === tab.key ? 'active' : ''}`}
                style={{
                  fontSize: 13,
                  fontWeight: activeTab === tab.key ? 800 : 600,
                  color: activeTab === tab.key ? '#0B1E4B' : '#64748b',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: '0.3px',
                  transition: 'color .2s ease',
                }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ── Table ── */}
          <div
            key={activeTab}
            className="tab-content !rounded-xl sm:!rounded-2xl !overflow-hidden"
            style={{ boxShadow: '0 4px 24px rgba(11,30,75,.08)', border: '1px solid #e2e8f0' }}
          >
            {/* Table Header */}
            <div
              className="gm-table-header !grid !items-center"
              style={{
                gridTemplateColumns: '52px 1fr 1fr',
                background: 'linear-gradient(90deg,#0B1E4B,#1e3a8a)',
                padding: '12px 20px',
              }}
            >
              <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,.7)', letterSpacing: '1.8px', textTransform: 'uppercase' }}>
                SR.
              </div>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,.7)', letterSpacing: '1.8px', textTransform: 'uppercase' }}>
                NAME
              </div>
              <div className="gm-col-company" style={{ fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,.7)', letterSpacing: '1.8px', textTransform: 'uppercase' }}>
                COMPANY / ORGANIZATION
              </div>
            </div>

            {/* Table Rows */}
            {loading && (
              <div style={{ padding: '22px 20px', background: '#fff', color: '#64748b', fontSize: 13, textAlign: 'center' }}>
                Loading members...
              </div>
            )}

            {!loading && error && (
              <div style={{ padding: '22px 20px', background: '#fff', color: '#b91c1c', fontSize: 13, textAlign: 'center' }}>
                {error}
              </div>
            )}

            {!loading && !error && data.length === 0 && (
              <div style={{ padding: '22px 20px', background: '#fff', color: '#64748b', fontSize: 13, textAlign: 'center' }}>
                No members available.
              </div>
            )}

            {!loading && !error && data.map((member, index) => (
              <div
                key={member.id}
                className="gm-row gm-table-row !grid !items-center"
                style={{
                  gridTemplateColumns: '52px 1fr 1fr',
                  padding: '12px 20px',
                  background: index % 2 === 0 ? '#fff' : '#f8fafc',
                  borderBottom: index < data.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}
              >
                {/* SR */}
                <div
                  className="gm-row-sr"
                  style={{ fontSize: 13, fontWeight: 600, color: '#94a3b8', transition: 'color .15s ease' }}
                >
                  {index + 1}
                </div>

                {/* Name + company sub (mobile only) */}
                <div className="gm-row-name-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div
                    className="gm-row-name"
                    style={{ fontSize: 13, fontWeight: 600, color: '#0B1E4B', transition: 'color .15s ease' }}
                  >
                    {member.name}
                  </div>
                  {/* Shown only on mobile via CSS */}
                  <span className="gm-row-company-sub" style={{ display: 'none' }}>
                    {member.company}
                  </span>
                </div>

                {/* Company — hidden on mobile */}
                <div
                  className="gm-col-company"
                  style={{ fontSize: 13, fontWeight: 500, color: '#64748b' }}
                >
                  {member.company}
                </div>
              </div>
            ))}
          </div>

          {/* ── View All Button ── */}
          <div className="!flex !justify-center !mt-[24px] sm:!mt-[36px] lg:!mt-[40px]">
            <button
              className="view-btn !flex !items-center !gap-2 !rounded-xl !border-0 !cursor-pointer"
              style={{
                padding: '11px 26px',
                background: 'linear-gradient(135deg,#0B1E4B,#1e3a8a)',
                fontSize: 13,
                fontWeight: 700,
                color: '#fff',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: '0 6px 20px rgba(11,30,75,.25)',
                letterSpacing: '0.3px',
              }}
              onClick={() => navigate('/members/general-members')}
            >
              <span className='text-white'>View All Members</span>
              <FaArrowRight className="btn-arrow text-white" style={{ fontSize: 12 }} />
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default GeneralMembers