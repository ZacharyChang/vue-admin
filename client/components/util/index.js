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
