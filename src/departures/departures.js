import React from 'react'
import { formatReadable, timeUntil } from '../util'
import { FOUR_MINUTES } from '../constants'

const Departures = ({ departureStation, departures = {} }) => {
  let trams = departures.Trams
  if (!departures || !trams || trams.length === 0) {
    return <p>Inga avgångar</p>
  }

  trams = trams.filter(tram => tram.JourneyDirection === departureStation.direction)

  const nextDeparture = trams[0]
  const nextDepartureTime = timeUntil(nextDeparture.ExpectedDateTime)
  const nextTrainText = <span>Nästa tåg mot <strong>{departureStation.destination}</strong> går om </span>

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
