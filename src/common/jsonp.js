import originJSONP from 'jsonp'

const data2param = (data) => {
  let url = ''
  
  Object.keys(data).forEach(key => {
    let value = data[key] || ''
    url += `&${key}=${encodeURIComponent(value)}` 
  })

  return url ? url.substring(1) : ''
}

const jsonp = (url, data, option) => {
  url += ((url.indexOf('?') < 0) ? '?' : '&') + data2param(data)
  
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

export default jsonp
