export function formateDate (date) {
  let theDate = new Date(date)
  let year = theDate.getFullYear()
  let month = theDate.getMonth() + 1
  let day = theDate.getDate()
  let hour = theDate.getHours()
  let minute = theDate.getMinutes()
  let second = theDate.getSeconds()
  return year + '-' + formatTen(month) + '-' + formatTen(day) + ' ' + formatTen(hour) + ':' + formatTen(minute) + ':' + formatTen(second)
}

function formatTen (num) {
  return num > 9 ? (num + '') : ('0' + num)
}
