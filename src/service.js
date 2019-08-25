import axios from 'axios'
import uuid from 'uuid/v4'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

let requestIds = new Map()

axios.interceptors.request.use(config => {
  const id = uuid()
  config.__id = id
  requestIds.set(id, NProgress.done)
  NProgress.start()
  setInterval(() => {
    NProgress.inc()
  }, 200)
  return config;
}, function (error) {
  NProgress.done()
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  const id = response.config.__id
  const stop = requestIds.get(id)
  stop()
  requestIds.delete(id)
  return response;
}, function (error) {
  NProgress.done()
  return Promise.reject(error);
});


export const getRealtimeDataFor = siteId => {
  return axios.get('/.netlify/functions/realTimeApi?siteId=' + siteId)
}
