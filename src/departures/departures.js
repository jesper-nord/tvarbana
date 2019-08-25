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

  const nextDeparture = trams[0]
  const nextDepartureTime = timeUntil(nextDeparture.ExpectedDateTime)
  const nextTrainText = <span>Nästa tåg mot <strong>Sickla</strong> går om </span>

  let content
  if (nextDepartureTime < FOUR_MINUTES) {
    content = (
      <div>
        <p>{nextTrainText}<strong>{formatReadable(nextDepartureTime)}</strong></p>
        <p>Tåget därefter går om</p>
        <h1>{formatReadable(timeUntil(trams[1].ExpectedDateTime))}</h1>
      </div>
    )
  } else {
    content = (
      <div>
        <p>{nextTrainText}</p>
        <h1>{formatReadable(nextDepartureTime)}</h1>
      </div>
    )
  }

  return (
    <div className="departures">
      {nextDeparture.Deviations && (
        <strong>Avvikelse: {nextDeparture.Deviations}</strong>
      )}
      {content}
    </div>
  )
}

export default Departures
