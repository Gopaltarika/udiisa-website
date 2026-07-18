import React from 'react'
import PageHero from '../../../../shared/components/PageHero'
import MembersData from './MembersData'
import SEO from '@/shared/components/SEO'

const Members = () => {
  return (
    <div>
      <SEO
        title="Our Members & Directory"
        description="Meet the patrons, ambassadors, corporate entities, and sports promoters who form the backbone of UDIISA Sports NGO."
        keywords="sports NGO members, UDIISA directory, sports patrons India, grassroots sports community"
      />
      <PageHero
        badge="OUR Members"
        heading="MEMBER"
        highlight="DIRECTORY"
        description="Distinguished patrons, ambassadors, dignitaries, and corporate bodies who champion India's grassroots sports revolution."
        bgImage="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=85&fit=crop"
      />
      <MembersData />
    </div>
  )
}

export default Members
