import axios from 'axios'
import uuid from 'uuid/v4'
import NProgress from 'multi-nprogress'
import 'multi-nprogress/nprogress.css'

export const configAxios = () => {
  const progress = NProgress()
  const requestIds = new Map()
  
  axios.interceptors.request.use(config => {
    const id = uuid()
    config.__id = id
    progress.start()
    const interval = setInterval(() => {
      progress.inc()
    }, 200)
    requestIds.set(id, interval)
    return config;
  }, function (error) {
    progress.done()
    progress.remove()
    return Promise.reject(error);
  });
  
  axios.interceptors.response.use(response => {
    const id = response.config.__id
    clearInterval(requestIds.get(id))
    requestIds.delete(id)
    progress.done()
    progress.remove()
    return response;
  }, function (error) {
    progress.done()
    progress.remove()
    return Promise.reject(error);
  });
}