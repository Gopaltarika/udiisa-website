import React from 'react'
import PageHero from '../../../../shared/components/PageHero'
import ContactForm from './ContactForm'
import SEO from '@/shared/components/SEO'

const ContactUs = () => {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with UDIISA Sports NGO India. Contact us for athlete sponsorship, membership inquiries, donations, or partnership opportunities."
        keywords="contact UDIISA, sports NGO contact number, sponsor young athletes India, contact sports charity"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact UDIISA Sports NGO",
          "description": "Get in touch with UDIISA Sports NGO India. Contact us for athlete sponsorship, membership inquiries, donations, or partnership opportunities.",
          "url": "https://udisports.in/contact-us"
        }}
      />
      <PageHero
        badge="Reach Out to Us"
        heading="Contact"
        highlight="Us"
        description="We're here to help! Reach out to us for any queries or support."
        bgImage="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=85&fit=crop"
      />
      <ContactForm />
    </>
  )
}

export default ContactUs
