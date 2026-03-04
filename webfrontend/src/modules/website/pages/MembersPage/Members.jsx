import React from 'react'
import PageHero from '../../../../shared/components/PageHero'
import MembersData from './MembersData'

const Members = () => {
  return (
    <div>
    <PageHero
      badge="OUR COMMUNITY"
      heading="MEMBER"
      highlight="DIRECTORY"
      description="Meet the people who make SportForce possible"
      bgImage="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=85&fit=crop"
      />
      <MembersData />
    </div>
  )
}

export default Members
