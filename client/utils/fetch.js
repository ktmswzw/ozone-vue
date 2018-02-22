import axios from 'axios'
import store from '../store'
import { msg } from './message'
export function fetch (options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: process.env.SERVER_API,
      timeout: 10000,
      headers: {'Authorization': store.state.user.token}
    })
    instance(options)
      .then(response => {
        const res = response.data
        if (res.apistatus !== 0) {
          msg({
            title: res.result.error_en,
            message: res.result.error_code + res.result.error,
            type: 'warning',
            duration: 5000
          })
          reject(res)
        }
        resolve(res)
      })
      .catch(error => {
        msg({
          title: '服务器异常',
          message: error,
          type: 'danger',
          duration: 15000
        })
        reject(error)
      })
  })
}
