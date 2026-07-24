import React, { useState, useEffect } from 'react'
import PageHero from '../../../../shared/components/PageHero'
import TalentedPlayersCards from './TalentedPlayersCards'
import { getPublicPlayers } from '../../../../shared/services/publicApi'
import SEO from '@/shared/components/SEO'

const TalentedPlayers = () => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPublicPlayers()
      .then((data) => setPlayers(Array.isArray(data) ? data : []))
      .catch(() => setPlayers([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <SEO
        title="UDIISA Talented Players & Sponsored Athletes"
        description="Meet rising athletes supported by UDIISA — talent stories, achievements and journeys powered by UDI International Sports Association."
        keywords="UDIISA talented players, UDIISA sponsored athletes, grassroots athletes India"
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "UDIISA Sponsored Talented Players",
          "description": "Rising sports stars and talented young athletes supported by UDIISA.",

          "numberOfItems": players.length,
          "itemListElement": players.map((p, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "item": {
              "@type": "Person",
              "name": p.name,
              "description": p.achievement || p.sportsType || "UDIISA Athlete"
            }
          }))
        }}
      />
      <PageHero
        badge="Rising Stars"
        heading="Talented"
        highlight="Players"
        description="Meet the Players we proudly support and Celebrate their achievements"
        bgImage="https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1920&q=85&fit=crop"
      />
      {loading ? (
        <div className="min-h-[40vh] flex items-center justify-center text-slate-500 font-medium">Loading…</div>
      ) : (
        <TalentedPlayersCards players={players} />
      )}
    </>
  )
}

export default TalentedPlayers
