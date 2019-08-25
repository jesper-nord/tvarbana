import axios from 'axios'

const BASE_URL = 'https://api.sl.se/api2'
const REAL_TIME_API = 'realtimedeparturesV4.json'

export const getRealtimeDataFor = siteId => {
  return axios.get(`${BASE_URL}/${REAL_TIME_API}?key=${process.env.REACT_APP_SL_API_KEY}&siteid=${siteId}&timewindow=30`)
}
