import React from 'react'
import { formatReadable, timeUntil } from '../util'

const FOUR_MINUTES = 240000

export const Departures = ({ departures }) => {
  if (!departures || departures.length === 0) {
    return null
  }

  const nextDeparture = departures[0]
  const nextDepartureTime = timeUntil(nextDeparture.ExpectedDateTime)

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
    <div class="departures">
      {content}
    </div>
  )
}
