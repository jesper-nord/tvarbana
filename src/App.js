import React, { useState, useEffect } from 'react'
import './App.css'
import { getRealtimeData } from './service'
import { formatMilliseconds } from './util'

const SOLNA_BUSINESS_PARK = 5119
const DIRECTION = 2
const FOUR_HALF_MINUTES = 270000

export const App = () => {
  const [latestUpdate, setLatestUpdate] = useState(new Date())
  const [departures, setDepartures] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getRealtimeData(SOLNA_BUSINESS_PARK)
        const responseData = response.data.ResponseData
        setDepartures(responseData.Trams.filter(departure => departure.JourneyDirection === DIRECTION))
        setLatestUpdate(new Date(responseData.LatestUpdate))
      } catch (e) {
        console.error('error fetching data', e)
      }
    }
    fetch()
  }, [])

  if (!departures || departures.length === 0) {
    return null
  }

  let nextDeparture = departures[0]
  if (new Date(nextDeparture.ExpectedDateTime).getTime() - new Date().getTime() < FOUR_HALF_MINUTES) {
    nextDeparture = departures[1]
  }
  const nextDepartureTime = formatMilliseconds(new Date(nextDeparture.ExpectedDateTime).getTime() - new Date().getTime())

  return (
    <div className="App">
      <p>Antal avgångar: {departures.length}</p>
      <p>Nästa tåg mot Sickla går om {nextDepartureTime}</p>
      <p>Senast uppdaterad: {latestUpdate.toLocaleDateString('se-SV', {timeStyle: 'medium'})}</p>
    </div>
  )
}
