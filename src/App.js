import React, { useState, useEffect } from 'react'
import './app.css'
import { Departures } from './departures'
import { getRealtimeDataFor } from './service'
import { formatReadable, timeFrom } from './util'

const SOLNA_BUSINESS_PARK = 5119

export const App = () => {
  const [latestUpdate, setLatestUpdate] = useState(new Date())
  const [departures, setDepartures] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRealtimeDataFor(SOLNA_BUSINESS_PARK)
        const responseData = response.data.ResponseData
        setDepartures(responseData.Trams)
        setLatestUpdate(new Date(responseData.LatestUpdate))
      } catch (e) {
        console.error('error fetching data', e)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="app">
      <Departures departures={departures} />
      <em className="update">Senast uppdaterad för {formatReadable(timeFrom(latestUpdate))} sedan</em>
    </div>
  )
}
