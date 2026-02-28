import React from 'react'
import PageHero from '../../../../shared/components/PageHero'
import TalentedPlayersCards from './TalentedPlayersCards'

const TalentedPlayers = () => {
  return (
    <>
        <PageHero
            badge="Rising Stars"
            heading="Talented"
            highlight="Players"
            description="Meet the athletes we proudly support and Celebrate their achievements"
            bgImage="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=85&fit=crop"
            />
            <TalentedPlayersCards />
    </>
  )
}

export default TalentedPlayers
