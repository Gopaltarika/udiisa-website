import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FaChevronDown, FaSearch, FaQuestionCircle,
} from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { MdSupportAgent } from 'react-icons/md'

export const FAQS = [
  {
    cat: 'about',
    q: 'What is UDIISA?',
    a: 'UDIISA (UDI International Sports Association) is a non-profit sports organization dedicated to identifying, nurturing, and empowering athletes through training, mentorship, scholarships, and sports development programs across India.',
  },
  {
    cat: 'programs',
    q: 'Who can join UDIISA programs?',
    a: 'Our programs are open to aspiring athletes, students, schools, colleges, sports academies, coaches, and sports enthusiasts who are passionate about developing their sporting potential.',
  },
  {
    cat: 'programs',
    q: 'How can I register for a sports program?',
    a: 'You can register by visiting our Programs or Events section and completing the online registration form. Our team will review your application and contact you with the next steps.',
  },
  {
    cat: 'programs',
    q: 'Does UDIISA provide scholarships?',
    a: 'Yes. UDIISA offers scholarships and financial assistance to deserving athletes based on talent, performance, and eligibility criteria. Scholarship opportunities are announced periodically on our website.',
  },
  {
    cat: 'partnership',
    q: 'Can schools and colleges partner with UDIISA?',
    a: 'Absolutely. We collaborate with schools, colleges, universities, sports academies, and other organizations to promote sports education, talent identification, and athlete development initiatives.',
  },
  {
    cat: 'support',
    q: 'How can I become a volunteer?',
    a: 'You can apply through our Volunteer page by filling out the application form. Volunteers contribute to sports events, community outreach, athlete support, and organizational activities.',
  },
  {
    cat: 'programs',
    q: 'Does UDIISA organize sports events and tournaments?',
    a: 'Yes. We organize various sporting events, championships, talent hunts, workshops, coaching camps, and community sports programs throughout the year.',
  },
  {
    cat: 'support',
    q: "How can I support UDIISA's mission?",
    a: 'You can support us by donating, becoming a volunteer, sponsoring an athlete, partnering with us, or spreading awareness about our initiatives within your community.',
  },
  {
    cat: 'support',
    q: 'Are donations to UDIISA secure?',
    a: 'Yes. We use secure payment methods to ensure that every donation is processed safely and transparently. Your support directly contributes to athlete development and sports initiatives.',
  },
  {
    cat: 'partnership',
    q: 'Can I sponsor an athlete?',
    a: 'Yes. Individuals, organizations, and corporate partners can sponsor athletes by supporting their training, equipment, travel, education, and competition expenses.',
  },
  {
    cat: 'support',
    q: 'How can I stay updated with upcoming events?',
    a: 'You can subscribe to our newsletter, follow us on social media, or regularly visit our website to stay informed about upcoming events, programs, and announcements.',
  },
  {
    cat: 'about',
    q: 'Does UDIISA work only in one state?',
    a: 'No. UDIISA works across multiple states in India and continues to expand its reach through partnerships with educational institutions, sports organizations, and community groups.',
  },
  {
    cat: 'programs',
    q: 'What sports does UDIISA support?',
    a: 'We support a wide range of sports, including cricket, football, athletics, volleyball, badminton, basketball, kabaddi, wrestling, and many other disciplines based on available programs and partnerships.',
  },
  {
    cat: 'support',
    q: 'How can I contact the UDIISA team?',
    a: 'You can reach us through the Contact page, email, or phone. Our team is happy to answer your questions regarding programs, partnerships, volunteering, sponsorships, and other inquiries.',
  },
  {
    cat: 'about',
    q: 'Why should I choose UDIISA?',
    a: 'UDIISA is committed to creating opportunities for athletes through quality training, mentorship, scholarships, community engagement, and partnerships. Our mission is to help individuals unlock their potential and contribute to the growth of sports in India.',
  },
  {
    cat: 'programs',
    q: 'How does the athlete selection process work?',
    a: 'Our selection process is transparent and merit-based. Athletes are evaluated through registrations, talent assessments, sports trials, performance records, recommendations from coaches, and eligibility criteria specific to each program. Final selections are made by our evaluation committee.',
  },
  {
    cat: 'programs',
    q: 'What are the eligibility criteria for joining UDIISA programs?',
    a: "Eligibility varies depending on the program or event. Most programs require applicants to meet age, skill, and documentation requirements. Specific eligibility details are provided on each program's registration page.",
  },
  {
    cat: 'membership',
    q: 'How can I become a UDIISA member?',
    a: 'Becoming a UDIISA member is simple. Visit our Membership page, complete the online application form, submit the required documents, and pay the applicable membership fee (if required). Once your application is reviewed and approved, you will receive your official membership confirmation.',
  },
  {
    cat: 'membership',
    q: 'What are the benefits of becoming a UDIISA member?',
    a: 'UDIISA members enjoy access to exclusive sports events, training camps, workshops, networking opportunities, talent identification programs, scholarships (where applicable), and updates about upcoming competitions and initiatives.',
  },
  {
    cat: 'membership',
    q: 'Is membership open to everyone?',
    a: 'Yes. Membership is open to athletes, coaches, schools, colleges, sports academies, volunteers, sports professionals, and individuals who wish to contribute to the growth of sports and youth development.',
  },
  {
    cat: 'programs',
    q: 'Can I apply for more than one sports program?',
    a: 'Yes. Applicants may apply for multiple programs if they meet the eligibility requirements of each program. However, final participation depends on selection and scheduling.',
  },
  {
    cat: 'programs',
    q: 'What documents are required during registration?',
    a: 'Depending on the program, applicants may be asked to submit proof of identity, age verification, passport-size photographs, previous sports achievements or certificates, and any additional documents mentioned in the registration guidelines.',
  },
  {
    cat: 'programs',
    q: 'How will I know if I have been selected?',
    a: 'Selected candidates will be notified through email, phone, or SMS. You can also check your application status through your registered account or the official announcements on our website.',
  },
  {
    cat: 'partnership',
    q: 'Can international athletes or organizations collaborate with UDIISA?',
    a: 'Yes. UDIISA welcomes collaborations with international athletes, sports organizations, educational institutions, NGOs, and corporate partners to promote sports development and exchange programs.',
  },
  {
    cat: 'partnership',
    q: 'How can my organization partner with UDIISA?',
    a: 'Organizations interested in partnering with UDIISA can contact us through our Partnership / Contact page. We collaborate on CSR initiatives, sports events, sponsorships, athlete development, educational programs, and community outreach projects.',
  },
]

const CATS = [
  { id: 'all', label: 'All Questions' },
  { id: 'about', label: 'About UDIISA' },
  { id: 'programs', label: 'Programs' },
  { id: 'membership', label: 'Membership' },
  { id: 'support', label: 'Support' },
  { id: 'partnership', label: 'Partnership' },
]

export function buildFaqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export default function AboutFaqSection() {
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(0)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return FAQS.map((f, i) => ({ ...f, index: i })).filter((f) => {
      const catOk = cat === 'all' || f.cat === cat
      if (!catOk) return false
      if (!q) return true
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    })
  }, [cat, query])

  const toggle = (i) => setOpen((prev) => (prev === i ? -1 : i))

  return (
    <section id="faqs" className="relative !py-[88px] !px-[16px] sm:!px-[24px] overflow-hidden bg-[#0B1E4B]">
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-[120px] -right-[80px] w-[420px] h-[420px] rounded-full bg-[#F05A1A]/15 blur-[90px]" />
        <div className="absolute -bottom-[140px] -left-[60px] w-[380px] h-[380px] rounded-full bg-[#1565C0]/25 blur-[100px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative max-w-[980px] !mx-auto">
        {/* Header */}
        <div className="text-center !mb-[40px]">
          <div className="inline-flex items-center gap-[7px] !px-[16px] !py-[6px] rounded-full bg-white/10 border border-white/15 text-[#FFAD5C] text-[11px] font-extrabold tracking-[2px] uppercase !mb-[14px]">
            <HiSparkles className="text-[12px]" />
            Help Center
          </div>
          <h2 className="text-[clamp(28px,4vw,44px)] font-extrabold text-white !m-0 leading-[1.15]">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F05A1A] to-[#FFAD5C]">
              Questions
            </span>
          </h2>
          <p className="text-white/65 text-[15px] !m-0 !mt-[12px] max-w-[560px] !mx-auto leading-[1.7]">
            Everything you need to know about UDIISA programs, membership, scholarships, and partnerships — answered clearly.
          </p>
        </div>

        {/* Search */}
        <div className="relative !mb-[22px]">
          <FaSearch className="absolute left-[18px] top-1/2 -translate-y-1/2 text-white/35 text-[14px] pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(0)
            }}
            placeholder="Search FAQs — membership, scholarships, events…"
            className="w-full h-[54px] !pl-[48px] !pr-[18px] rounded-[16px] bg-white/10 border border-white/15 text-white text-[14.5px] font-medium placeholder:text-white/35 outline-none focus:border-[#F05A1A]/60 focus:bg-white/[0.14] transition-all"
            aria-label="Search frequently asked questions"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-[8px] !mb-[28px] justify-center sm:justify-start">
          {CATS.map((c) => {
            const active = cat === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCat(c.id)
                  setOpen(0)
                }}
                className={`
                  !px-[14px] !py-[8px] rounded-full text-[12.5px] font-bold border transition-all duration-200 cursor-pointer
                  ${active
                    ? 'bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] text-white border-transparent shadow-[0_8px_24px_rgba(240,90,26,0.35)]'
                    : 'bg-white/5 text-white/70 border-white/12 hover:bg-white/10 hover:text-white'}
                `}
              >
                {c.label}
              </button>
            )
          })}
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-[10px]">
          {filtered.length === 0 ? (
            <div className="rounded-[18px] bg-white/5 border border-white/10 !p-[36px] text-center">
              <FaQuestionCircle className="text-white/25 text-[36px] !mx-auto !mb-[12px]" />
              <p className="text-white/70 text-[15px] font-semibold !m-0">
                No FAQs match your search.
              </p>
              <p className="text-white/40 text-[13px] !m-0 !mt-[6px]">
                Try another keyword or browse by category.
              </p>
            </div>
          ) : (
            filtered.map((item, i) => {
              const isOpen = open === i
              const num = String(item.index + 1).padStart(2, '0')
              return (
                <div
                  key={item.index}
                  className={`
                    rounded-[18px] border overflow-hidden transition-all duration-300
                    ${isOpen
                      ? 'bg-white border-white shadow-[0_16px_40px_rgba(0,0,0,0.25)]'
                      : 'bg-white/[0.06] border-white/10 hover:bg-white/[0.1] hover:border-white/20'}
                  `}
                >
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-start gap-[14px] !px-[18px] sm:!px-[22px] !py-[18px] text-left cursor-pointer bg-transparent border-0"
                  >
                    <span
                      className={`
                        flex-shrink-0 w-[42px] h-[42px] rounded-[12px] flex items-center justify-center
                        text-[13px] font-extrabold tracking-wide
                        ${isOpen
                          ? 'bg-gradient-to-br from-[#0B1E4B] to-[#1565C0] text-white'
                          : 'bg-[#F05A1A]/15 text-[#FFAD5C]'}
                      `}
                    >
                      {num}
                    </span>
                    <span className="flex-1 min-w-0 !pt-[8px]">
                      <span
                        className={`block text-[15px] sm:text-[16px] font-extrabold leading-[1.35] !m-0 ${
                          isOpen ? 'text-[#0B1E4B]' : 'text-white'
                        }`}
                      >
                        {item.q}
                      </span>
                    </span>
                    <span
                      className={`
                        flex-shrink-0 w-[34px] h-[34px] rounded-full flex items-center justify-center !mt-[4px]
                        transition-all duration-300
                        ${isOpen
                          ? 'bg-[#FFF3EC] text-[#F05A1A] rotate-180'
                          : 'bg-white/10 text-white/70'}
                      `}
                    >
                      <FaChevronDown className="text-[11px]" />
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-300 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <div className="!px-[18px] sm:!px-[22px] !pb-[20px] !pl-[74px] sm:!pl-[78px]">
                        <div className="h-[2px] w-[48px] rounded-full bg-gradient-to-r from-[#F05A1A] to-[#FFAD5C] !mb-[14px]" />
                        <p className="text-slate-600 text-[14.5px] leading-[1.8] !m-0">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* CTA strip */}
        <div className="!mt-[36px] rounded-[20px] bg-gradient-to-r from-[#F05A1A] to-[#FF7D42] !p-[22px] sm:!p-[28px] flex flex-col sm:flex-row items-center gap-[16px] justify-between shadow-[0_16px_40px_rgba(240,90,26,0.35)]">
          <div className="flex items-center gap-[14px] text-center sm:text-left">
            <div className="hidden sm:flex w-[48px] h-[48px] rounded-[14px] bg-white/20 items-center justify-center text-white text-[22px] flex-shrink-0">
              <MdSupportAgent />
            </div>
            <div>
              <p className="text-white font-extrabold text-[16px] !m-0">
                Still have a question?
              </p>
              <p className="text-white/80 text-[13.5px] !m-0 !mt-[4px]">
                Our team is happy to help with programs, membership, and partnerships.
              </p>
            </div>
          </div>
          <Link
            to="/contact-us"
            className="inline-flex items-center justify-center !px-[22px] !py-[12px] rounded-[12px] bg-white text-[#0B1E4B] text-[13.5px] font-extrabold no-underline hover:-translate-y-[2px] transition-transform shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
          >
            Contact UDIISA
          </Link>
        </div>
      </div>
    </section>
  )
}
