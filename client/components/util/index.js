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
