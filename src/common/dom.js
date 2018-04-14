export const hasClass = (el, className) => {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export const addClass = (el, className) => {
  if (hasClass(el, className)) {
    return
  }

  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}


export const getData = (el, name) => {
  const prefix = 'data-'
  name = prefix + name
  return el.getAttribute(name)
}

export const setData = (el, name, val) => {
  const prefix = 'data-'
  name += prefix + name

  return el.setAttribute(name, val)
}
