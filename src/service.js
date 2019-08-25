import axios from 'axios'
import uuid from 'uuid/v4'
import NProgress from 'multi-nprogress'
import 'multi-nprogress/nprogress.css'

const progress = NProgress()
let requestIds = []

axios.interceptors.request.use(config => {
  const id = uuid()
  config.__id = id
  requestIds.push(id)
  progress.start()
  setInterval(() => {
    progress.inc()
  }, 200)
  return config;
}, function (error) {
  progress.done()
  progress.remove()
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  requestIds = requestIds.filter(id => id !== response.config.__id)
  progress.done()
  progress.remove()
  return response;
}, function (error) {
  progress.done()
  progress.remove()
  return Promise.reject(error);
});


export const getRealtimeDataFor = siteId => {
  return axios.get('/.netlify/functions/realTimeApi?siteId=' + siteId)
}
