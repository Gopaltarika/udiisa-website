import React, { useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaAngleDoubleRight } from 'react-icons/fa'

const contactInfo = [
  {
    id: 1,
    icon: <FaMapMarkerAlt />,
    label: 'Our Office',
    value: '123 Sports Complex, Sector 12, New Delhi – 110001',
  },
  {
    id: 2,
    icon: <FaPhone />,
    label: 'Phone',
    value: '+91 83075 98050',
  },
  {
    id: 3,
    icon: <FaEnvelope />,
    label: 'Email',
    value: 'info@udisports.in',
  },
]

const ContactUs = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Message sent!\nName: ${form.name}\nEmail: ${form.email}`)
  }

  return (
    <>
      <style>{`
        .contact-input, .contact-textarea {
          outline: none;
          transition: border-color .25s ease, box-shadow .25s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .contact-input:focus, .contact-textarea:focus {
          border-color: #F05A1A !important;
          box-shadow: 0 0 0 3px rgba(240,90,26,.12) !important;
        }
        .contact-input::placeholder, .contact-textarea::placeholder {
          color: #F05A1A;
          opacity: 0.6;
          font-size: 13px;
        }

        .info-icon {
          transition: transform .3s cubic-bezier(.16,1,.3,1), box-shadow .3s ease, background .25s ease;
          flex-shrink: 0;
        }
        .info-item:hover .info-icon {
          transform: scale(1.12) rotate(-6deg);
          background: linear-gradient(135deg,#F05A1A,#FF7D42) !important;
          box-shadow: 0 8px 24px rgba(240,90,26,.35) !important;
        }
        .info-item:hover .info-icon svg { color: #fff !important; }
        .info-item { transition: transform .25s ease; cursor: default; }
        .info-item:hover { transform: translateX(4px); }

        .submit-btn {
          position: relative; overflow: hidden;
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .submit-btn::after {
          content: '';
          position: absolute; top:0; left:-80%; width:60%; height:100%;
          background: linear-gradient(120deg,transparent,rgba(255,255,255,.2),transparent);
          transform: skewX(-15deg);
          transition: left .4s ease;
        }
        .submit-btn:hover::after { left: 130%; }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(240,90,26,.45) !important;
        }
        .submit-btn:hover .s-arrow { transform: translateX(3px); }
        .s-arrow { transition: transform .25s ease; }

        .title-bar {
          width: 40px; height: 3px; border-radius: 2px;
          background: linear-gradient(90deg,#F05A1A,#FF7D42);
          margin-top: 10px; margin-bottom: 14px;
        }

        @media (min-width: 640px) {
          .title-bar { width: 52px; height: 4px; margin-top: 14px; margin-bottom: 20px; }
        }
      `}</style>

      <section className="contact-section !bg-white !py-[32px] sm:!py-[56px] lg:!py-[80px] !px-[12px] sm:!px-[24px] lg:!px-[32px]">
        <div className="!max-w-[1100px] !mx-auto">
          <div className="!flex !flex-col lg:!flex-row !gap-[28px] sm:!gap-[40px] lg:!gap-[80px]">

            {/* ══ LEFT — Info ══ */}
            <div className="!flex-1">

              {/* Badge */}
              <div
                className="inline-flex items-center !rounded-full !mb-[10px] sm:!mb-[16px]"
                style={{
                  padding: '4px 14px',
                  border: '1.5px solid rgba(240,90,26,.4)',
                  background: 'rgba(240,90,26,.05)',
                  fontSize: 10, fontWeight: 700,
                  letterSpacing: '2.5px', textTransform: 'uppercase',
                  color: '#F05A1A',
                }}
              >
                Get In Touch
              </div>

              {/* Heading */}
              <h2
                className="!m-0"
                style={{
                  fontFamily: "'Bebas Neue', cursive",
                  fontSize: 'clamp(30px,5.5vw,58px)',
                  letterSpacing: 2, lineHeight: 1.05,
                  color: '#0B1E4B',
                }}
              >
                Let's Start A{' '}
                <br />
                <span style={{ color: '#F05A1A' }}>Conversation</span>
              </h2>

              {/* Underline */}
              <div className="title-bar" />

              {/* Subtext */}
              <p
                className="!mt-0 !mb-[16px] sm:!mb-[28px]"
                style={{
                  fontSize: 'clamp(12.5px,1.4vw,15px)',
                  color: '#475569', lineHeight: 1.7, maxWidth: 400,
                }}
              >
                Have a question or want to partner with us? We'd love to hear from you.
              </p>

              {/* Contact Info Items */}
              <div className="!flex !flex-col !gap-[14px] sm:!gap-[20px]">
                {contactInfo.map((item) => (
                  <div key={item.id} className="info-item !flex !items-start !gap-[12px] sm:!gap-[16px]">

                    {/* Icon */}
                    <div
                      className="info-icon !flex !items-center !justify-center !rounded-xl"
                      style={{
                        width: 38, height: 38,
                        background: 'rgba(240,90,26,.08)',
                        boxShadow: '0 2px 10px rgba(240,90,26,.1)',
                        flexShrink: 0,
                      }}
                    >
                      <span style={{ color: '#F05A1A', fontSize: 14 }}>{item.icon}</span>
                    </div>

                    {/* Text */}
                    <div>
                      <div style={{ fontSize: 12.5, fontWeight: 800, color: '#0B1E4B', marginBottom: 2 }}>
                        {item.label}
                      </div>
                      <div style={{ fontSize: 12.5, color: '#64748b', lineHeight: 1.55 }}>
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ══ RIGHT — Form ══ */}
            <div className="!flex-1">

              <h3
                className="!mt-0 !mb-[14px] sm:!mb-[20px]"
                style={{
                  fontSize: 'clamp(18px,3vw,30px)',
                  fontWeight: 800,
                  color: '#F05A1A',
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: '-0.3px',
                }}
              >
                Get help !
              </h3>

              <form onSubmit={handleSubmit}>

                {/* Name + Email row */}
                <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-[10px] sm:!gap-[14px] !mb-[10px] sm:!mb-[14px]">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    className="contact-input !w-full !rounded-xl !bg-white"
                    style={{
                      padding: '11px 14px',
                      fontSize: 13, color: '#0B1E4B',
                      border: '1.5px solid rgba(240,90,26,.35)',
                    }}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused('')}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="contact-input !w-full !rounded-xl !bg-white"
                    style={{
                      padding: '11px 14px',
                      fontSize: 13, color: '#0B1E4B',
                      border: '1.5px solid rgba(240,90,26,.35)',
                    }}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused('')}
                    required
                  />
                </div>

                {/* Message */}
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="contact-textarea !w-full !rounded-xl !bg-white !mb-[12px] sm:!mb-[18px] !resize-none !block"
                  style={{
                    padding: '11px 14px',
                    fontSize: 13, color: '#0B1E4B',
                    border: '1.5px solid rgba(240,90,26,.35)',
                  }}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused('')}
                  required
                />

                {/* Submit */}
                <button
                  type="submit"
                  className="submit-btn !flex !items-center !gap-2 !rounded-xl !border-0 !cursor-pointer"
                  style={{
                    padding: '11px 26px',
                    background: 'linear-gradient(135deg,#F05A1A,#FF7D42)',
                    fontSize: 13, fontWeight: 700,
                    color: '#fff',
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    boxShadow: '0 6px 20px rgba(240,90,26,.32)',
                    letterSpacing: '0.3px',
                  }}
                >
                  Next
                  <FaAngleDoubleRight className="s-arrow" style={{ fontSize: 13 }} />
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}

export default ContactUs