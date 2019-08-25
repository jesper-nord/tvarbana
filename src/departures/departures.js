import React from 'react'
import { formatReadable, timeUntil } from '../util'

const FOUR_MINUTES = 240000
const DIRECTION_SICKLA = 2

const Departures = ({ departures }) => {
  if (!departures || departures.length === 0) {
    return <p>Inga avgångar</p>
  }

  departures = departures.filter(departure => departure.JourneyDirection === DIRECTION_SICKLA)

  const nextDepartureTime = timeUntil(departures[0].ExpectedDateTime)

  let content
  if (nextDepartureTime < FOUR_MINUTES) {
    content = (
      <div>
        <p>Nästa tåg mot Sickla går om {formatReadable(nextDepartureTime)}</p>
        <p>Tåget därefter går om</p>
        <h1>{formatReadable(timeUntil(departures[1].ExpectedDateTime))}</h1>
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
