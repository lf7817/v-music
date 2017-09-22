import oJsonp from 'jsonp'

const jsonp = (url, data, opts) => {
  url += (url.indexOf('?') < 0 ? '?' : '&') + dataToParams(data)
  return new Promise((resolve, reject) => {
    oJsonp(url, opts, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
/* eslint-disable no-return-assign */
const dataToParams = data => (
  Object.keys(data).reduce((url, k) => {
    return url += `&${k}=${encodeURIComponent(data[k] !== undefined ? data[k] : '')}`
  }, '').substring(1)
)
export default jsonp
