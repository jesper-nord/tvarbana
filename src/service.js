import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.interceptors.request.use(function (config) {
  NProgress.start()
  setInterval(() => {
    NProgress.inc()
  }, 150)
  return config;
}, function (error) {
  NProgress.done()
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  NProgress.done()
  return response;
}, function (error) {
  NProgress.done()
  return Promise.reject(error);
});


export const getRealtimeDataFor = siteId => {
  return axios.get('/.netlify/functions/realTimeApi?siteId=' + siteId)
}
