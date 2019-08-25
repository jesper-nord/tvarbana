import React, { useState, useEffect } from 'react'
import './app.css'
import { Departures } from './departures'
import { getRealtimeData } from './service'
import { formatReadable, timeFrom } from './util'

const SOLNA_BUSINESS_PARK = 5119
const DIRECTION_SICKLA = 2

export const App = () => {
  const [latestUpdate, setLatestUpdate] = useState(new Date())
  const [departures, setDepartures] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await getRealtimeData(SOLNA_BUSINESS_PARK)
        const responseData = response.data.ResponseData
        setDepartures(responseData.Trams.filter(departure => departure.JourneyDirection === DIRECTION_SICKLA))
        setLatestUpdate(new Date(responseData.LatestUpdate))
      } catch (e) {
        console.error('error fetching data', e)
      }
    }
    fetch()
  }, [])

  return (
    <div className="app">
      <Departures departures={departures} />
      <em className="update">Senast uppdaterad för {formatReadable(timeFrom(latestUpdate))} sedan</em>
    </div>
  )
}
