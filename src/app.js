import React, { useState, useEffect } from 'react'
import './app.css'
import Departures from './departures/departures'
import { formatReadable, timeFrom } from './util'
import { getRealtimeDataFor } from './service'
import { STATION_GLOBEN, STATION_SOLNA_BUSINESS_PARK } from './constants'

const App = () => {
  const [latestUpdate, setLatestUpdate] = useState(new Date())
  const [departures, setDepartures] = useState([])

  const departureStation = new Date().getHours() < 12 ? STATION_GLOBEN : STATION_SOLNA_BUSINESS_PARK

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRealtimeDataFor(departureStation.key)
        const responseData = response.data.data.ResponseData // wrapped API response data
        setDepartures(responseData)
        setLatestUpdate(new Date(responseData.LatestUpdate))
      } catch (e) {
        console.error('error fetching data', e)
      }
    }
    fetchData()
  }, [departureStation.key])

  return (
    <div className="app">
      <Departures departures={departures} departureStation={departureStation} />
      <em className="update">Senast uppdaterad för {formatReadable(timeFrom(latestUpdate))} sedan</em>
    </div>
  )
}

export default App
