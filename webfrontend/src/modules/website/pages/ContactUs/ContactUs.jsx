import React from 'react'
import PageHero from '../../../../shared/components/PageHero'
import ContactForm from './ContactForm'
import SEO from '@/shared/components/SEO'

const ContactUs = () => {
  return (
    <>
      <SEO
        title="Contact UDIISA | Get in Touch"
        description="Contact UDIISA (UDI International Sports Association) for membership, athlete sponsorship, donations, volunteering or partnership inquiries. Email info@udisports.in."
        keywords="contact UDIISA, UDIISA phone number, UDIISA email, sports NGO contact India"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact UDIISA",
          "description": "Get in touch with UDIISA for athlete sponsorship, membership, donations, or partnership opportunities.",
          "url": "https://udisports.in/contact-us",
          "mainEntity": {
            "@type": "NGO",
            "name": "UDIISA",
            "email": "info@udisports.in",
            "telephone": "+91-83075-98050"
          }
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
