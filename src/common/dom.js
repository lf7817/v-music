export const hasClass = (el, className) => {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export const addClass = (el, className) => {
  if (hasClass(el, className)) return
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export const getData = (el, name) => {
  const prefix = 'data-'
  return el.getAttribute(prefix + name)
}

let vendor = (() => {
  // 能力检测
  const elementStyle = document.createElement('div').style
  const transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export const prefixStyle = (style) => {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
