import axios from 'axios'

export const getRealtimeDataFor = siteId => {
  return axios.get('/.netlify/functions/realTimeApi?siteId=' + siteId + `&timestamp=${new Date().getTime()}`)
}
