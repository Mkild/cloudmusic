import { Notification } from 'element-ui'

export { debounce, throttle } from 'lodash-es'

export function pad(num, n = 2) {
  let len = num.toString().length
  while (len < n) {
    num = '0' + num
    len++
  }
  return num
}

export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  date = date instanceof Date ? date : new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  // eslint-disable-next-line no-unused-vars
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

export function formatTime(interval) {
  interval = interval | 0
  const minute = pad((interval / 60) | 0)
  const second = pad(interval % 60)
  return `${minute}:${second}`
}

export function formatNumber(number) {
  number = Number(number) || 0
  return number > 100000 ? `${Math.round(number / 10000)}万` : number
}

export function genImgUrl(url, w, h) {
  if (!h) {
    h = w
  }
  url += `?param=${w}y${h}`
  return url
}

export function isLast(index, arr) {
  return index === arr.length - 1
}

export function shallowEqual(a, b, compareKey) {
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    let compareA = a[i]
    let compareB = b[i]
    if (compareKey) {
      compareA = compareA[compareKey]
      compareB = compareB[compareKey]
    }
    if (!Object.is(a[i], b[i])) {
      return false
    }
  }
  return true
}

export function notify(message, type) {
  const params = {
    message,
    duration: 3000,
    offset: 100,
  }
  const fn = type ? Notification[type] : Notification
  return fn(params)
}
// eslint-disable-next-line no-extra-semi
;['success', 'warning', 'info', 'error'].forEach((key) => {
  notify[key] = (message) => {
    return notify(message, key)
  }
})

export function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration)
  })
}

export function requestFullScreen(element) {
  const docElm = element
  if (docElm.requestFullscreen) {
    docElm.requestFullscreen()
  } else if (docElm.msRequestFullscreen) {
    docElm.msRequestFullscreen()
  } else if (docElm.mozRequestFullScreen) {
    docElm.mozRequestFullScreen()
  } else if (docElm.webkitRequestFullScreen) {
    docElm.webkitRequestFullScreen()
  }
}

export function exitFullscreen() {
  const de = window.parent.document

  if (de.exitFullscreen) {
    de.exitFullscreen()
  } else if (de.mozCancelFullScreen) {
    de.mozCancelFullScreen()
  } else if (de.webkitCancelFullScreen) {
    de.webkitCancelFullScreen()
  } else if (de.msExitFullscreen) {
    de.msExitFullscreen()
  }
}

export function isFullscreen() {
  return document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
}

export function isTel(v) {
  return /^1[3,4,5,6,7,8,9][0-9]{9}$/.test(v.toString())
}

export function isCode(v) {
  return /^[0-9]{4}$/.test(v.toString())
}

export function isEmail(v) {
  return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v)
}

export function isNum(v) {
  return typeof value === 'number' && !isNaN(v)
}

export function isUndef(v) {
  return v === undefined || v === null
}

export function isDef(v) {
  return v !== undefined && v !== null
}

export function isTrue(v) {
  return v === true
}

export function isFalse(v) {
  return v === false
}

export function getPageOffset(page, limit) {
  return (page - 1) * limit
}
