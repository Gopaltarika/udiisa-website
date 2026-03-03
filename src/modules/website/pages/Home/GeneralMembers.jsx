import React, { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

// ── Data (baad mein API se replace karein) ──
const individualMembers = [
  { id: 1, name: 'Ajay Kumar',     company: 'Individual' },
  { id: 2, name: 'Bindu Sharma',   company: 'Sharma Textiles' },
  { id: 3, name: 'Chetan Patel',   company: 'Patel Group' },
  { id: 4, name: 'Disha Singh',    company: 'Individual' },
  { id: 5, name: 'Elan Kumar',     company: 'EK Solutions' },
  { id: 6, name: 'Fatima Bibi',    company: 'Individual' },
  { id: 7, name: 'Gaurav Agarwal', company: 'Agarwal Builders' },
  { id: 8, name: 'Himani Rawat',   company: 'Individual' },
]

const corporateMembers = [
  { id: 1, name: 'Reliance Sports Foundation', company: 'Reliance Industries Ltd.' },
  { id: 2, name: 'Tata Sports Council',        company: 'Tata Group' },
  { id: 3, name: 'Infosys Athletics Trust',    company: 'Infosys Pvt. Ltd.' },
  { id: 4, name: 'Mahindra Champions Fund',    company: 'Mahindra & Mahindra' },
  { id: 5, name: 'HDFC Sports Initiative',     company: 'HDFC Bank' },
  { id: 6, name: 'Wipro Youth Sports',         company: 'Wipro Technologies' },
  { id: 7, name: 'Bajaj Sports Welfare',       company: 'Bajaj Auto Ltd.' },
  { id: 8, name: 'Adani Sports Committee',     company: 'Adani Group' },
]

const tabs = [
  { key: 'individual', label: 'Individual' },
  { key: 'corporate',  label: 'Body Corporate' },
]

const GeneralMembers = () => {
  const [activeTab, setActiveTab] = useState('individual')
  const [hoveredRow, setHoveredRow] = useState(null)
  const navigate = useNavigate()

  const data = activeTab === 'individual' ? individualMembers : corporateMembers

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
          transition: background .15s ease, transform .15s ease;
          cursor: default;
        }
        .gm-row:hover {
          background: #FFF3EC !important;
        }
        .gm-row:hover .gm-row-name  { color: #F05A1A !important; }
        .gm-row:hover .gm-row-sr    { color: #F05A1A !important; font-weight: 700 !important; }

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
      `}</style>

      <section className="gm-section !bg-[#F4F6FB] !py-20 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-[1100px] !mx-auto">

          {/* ── Header ── */}
          <div className="!text-center !mb-10">
            <div
              className="inline-flex items-center !rounded-full !mb-4"
              style={{
                padding: '5px 18px',
                border: '1.5px solid rgba(240,90,26,.4)',
                background: 'rgba(240,90,26,.05)',
                fontSize: 11, fontWeight: 700,
                letterSpacing: '2.5px', textTransform: 'uppercase',
                color: '#F05A1A',
              }}
            >
              Directory
            </div>

            <h2
              className="!m-0 !mb-3"
              style={{
                fontFamily: "'Bebas Neue', cursive",
                fontSize: 'clamp(36px,6vw,60px)',
                letterSpacing: 3, lineHeight: 1.05, color: '#0B1E4B',
              }}
            >
              General <span style={{ color: '#F05A1A' }}>Members</span> Of UDIISA
            </h2>

            <div
              className="!mx-auto"
              style={{
                width: 52, height: 4, borderRadius: 2,
                background: 'linear-gradient(90deg,#F05A1A,#FF7D42)',
              }}
            />
          </div>

          {/* ── Tabs ── */}
          <div
            className="!flex !items-center !gap-0 !mb-6"
            style={{ borderBottom: '2px solid #e2e8f0' }}
          >
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`gm-tab !border-0 !bg-transparent !cursor-pointer !pb-3 !mr-6 ${activeTab === tab.key ? 'active' : ''}`}
                style={{
                  fontSize: 14,
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
            className="tab-content !rounded-2xl !overflow-hidden"
            style={{ boxShadow: '0 4px 24px rgba(11,30,75,.08)', border: '1px solid #e2e8f0' }}
          >
            {/* Table Header */}
            <div
              className="!grid !items-center"
              style={{
                gridTemplateColumns: '80px 1fr 1fr',
                background: 'linear-gradient(90deg,#0B1E4B,#1e3a8a)',
                padding: '14px 24px',
              }}
            >
              {['SR.', 'NAME', 'COMPANY / ORGANIZATION'].map((h, i) => (
                <div
                  key={h}
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: 'rgba(255,255,255,.7)',
                    letterSpacing: '1.8px',
                    textTransform: 'uppercase',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Table Rows */}
            {data.map((member, index) => (
              <div
                key={member.id}
                className="gm-row !grid !items-center"
                style={{
                  gridTemplateColumns: '80px 1fr 1fr',
                  padding: '14px 24px',
                  background: index % 2 === 0 ? '#fff' : '#f8fafc',
                  borderBottom: index < data.length - 1 ? '1px solid #f1f5f9' : 'none',
                }}
                onMouseEnter={() => setHoveredRow(member.id)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                {/* SR */}
                <div
                  className="gm-row-sr"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#94a3b8',
                    transition: 'color .15s ease',
                  }}
                >
                  {member.id}
                </div>

                {/* Name */}
                <div
                  className="gm-row-name"
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0B1E4B',
                    transition: 'color .15s ease',
                  }}
                >
                  {member.name}
                </div>

                {/* Company */}
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 500,
                    color: '#64748b',
                  }}
                >
                  {member.company}
                </div>
              </div>
            ))}
          </div>

          {/* ── View All Button ── */}
          <div className="!flex !justify-center !mt-10">
            <button
              className="view-btn !flex !items-center !gap-2.5 !rounded-xl !border-0 !cursor-pointer !text-white"
              style={{
                padding: '13px 32px',
                background: 'linear-gradient(135deg,#0B1E4B,#1e3a8a)',
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                boxShadow: '0 6px 20px rgba(11,30,75,.25)',
                letterSpacing: '0.3px',
              }}
              onClick={() => navigate('/members/general-members')}
            >
              <span className='text-white'>View All Members</span>
              <FaArrowRight className="btn-arrow" style={{ fontSize: 13 }} />
            </button>
          </div>

        </div>
      </section>
    </>
  )
}

export default GeneralMembers