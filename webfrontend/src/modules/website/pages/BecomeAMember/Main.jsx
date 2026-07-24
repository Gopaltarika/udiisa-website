import React from 'react'
import MembershipForm from './Membershipdetail'
import PageHero from '../../../../shared/components/PageHero'
import SEO from '@/shared/components/SEO'

const Main = () => {
  return (
    <>
      <SEO
        title="Become a UDIISA Member | Join Today"
        description="Join UDIISA as an individual patron, player or lifetime corporate member. Access events, training camps, networking and athlete support programs."
        keywords="UDIISA membership, become UDIISA member, UDIISA registration, sports NGO membership India"
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
