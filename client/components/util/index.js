import moment from 'moment'

export function formatByInterval (date, interval) {
  var format = 'YYYY-MM-DD HH:mm:ss'
  switch (interval) {
    case 'month':
      format = 'YYYY-MM'
      break
    case 'week':
      format = 'YYYY-MM-DD ww[th week]'
      break
    case 'day':
      format = 'YYYY-MM-DD'
      break
    case 'hour':
      format = 'YYYY-MM-DD HH[h]'
      break
    case 'minute':
      format = 'YYYY-MM-DD HH:mm'
      break
  }
  return moment(date).format(format)
}

export function timezone () {
  var offset = new Date().getTimezoneOffset() / 60
  var abs = Math.abs(offset)
  var str = '0' + abs + ':00'
  // the timezone is opposite to the offset
  if (offset > 0) {
    return '-' + str.slice(-5)
  }
  return '+' + str.slice(-5)
}

export function getDate (date) {
  return moment(date).format('YYYY-MM-DD')
}

export function nextDay (date) {
  return moment(date).add(1, 'd').format('YYYY-MM-DD')
}

export function humanize (date) {
  if (!date) {
    return 'no time'
  }
  date = parseInt(date)
  if (date < 60) {
    return date + ' seconds'
  }
  return moment.duration(date, 'seconds').humanize()
}

export function paginationLayout () {
  if (window.matchMedia('(max-width:768px)').matches) {
    return 'prev, pager, next'
  }
  return 'total, sizes, prev, pager, next, jumper'
}

export function thisWeekRange () {
  return [
    moment().startOf('week'),
    moment().startOf('day')
  ]
}

export function thisDayRange () {
  return [
    moment().startOf('day'),
    moment().startOf('day')
  ]
}

export const elasticAPI = 'http://localhost:3000/elastic'
