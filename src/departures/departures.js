import React from 'react'
import { formatReadable, timeUntil } from '../util'

const FOUR_MINUTES = 240000
const DIRECTION_SICKLA = 2

const Departures = ({ departures = {} }) => {
  let trams = departures.Trams
  if (!departures || !trams || trams.length === 0) {
    return <p>Inga avgångar</p>
  }

  trams = trams.filter(tram => tram.JourneyDirection === DIRECTION_SICKLA)

  const nextDepartureTime = timeUntil(trams[0].ExpectedDateTime)

  let content
  if (nextDepartureTime < FOUR_MINUTES) {
    content = (
      <div>
        <p>Nästa tåg mot Sickla går om {formatReadable(nextDepartureTime)}</p>
        <p>Tåget därefter går om</p>
        <h1>{formatReadable(timeUntil(trams[1].ExpectedDateTime))}</h1>
      </div>
    )
  } else {
    content = (
      <div>
        <p>Nästa tåg mot Sickla går om</p>
        <h1>{formatReadable(nextDepartureTime)}</h1>
      </div>
    )
  }

  return (
    <div className="departures">
      {content}
    </div>
  )
}

export default Departures
