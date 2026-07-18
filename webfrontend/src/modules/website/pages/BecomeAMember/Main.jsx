import React from 'react'
import MembershipForm from './Membershipdetail'
import PageHero from '../../../../shared/components/PageHero'
import SEO from '@/shared/components/SEO'

const Main = () => {
  return (
    <>
      <SEO
        title="Become a Member"
        description="Join UDIISA Sports NGO as an individual patron, lifetime corporate member, or athlete. Support sports development in India."
        keywords="become sports NGO member, support sports India, corporate sports sponsorship, sports registration India"
      />
      <PageHero
        badge="Join SPORTFORCE"
        heading="Become a"
        highlight="Member"
        description="Choose your membership type and fill in your details to get started with SportForce."
        bgImage="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=85&fit=crop"
      />
      <MembershipForm />
    </>
  )
}

export default Main
