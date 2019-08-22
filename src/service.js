import axios from 'axios'

const BASE_URL = 'http://api.sl.se/api2'
const REAL_TIME_API = 'realtimedeparturesV4.json'

export const getRealtimeData = siteId => {
  return axios.get(`${BASE_URL}/${REAL_TIME_API}?key=${process.env.REACT_APP_SL_API_KEY}&siteid=${siteId}&timewindow=25&bus=false&metro=false&ship=false&train=false`)
}
