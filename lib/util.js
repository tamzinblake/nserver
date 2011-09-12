function dateTime () {
  var currentTime = new Date()
  return parseDate(currentTime)
}

function parseDate (date) {
  var year = date.getFullYear()
    , month = date.getMonth() + 1
    , day = date.getDate()
    , hours = date.getHours()
    , minutes = date.getMinutes()
    , seconds = date.getSeconds()
    , rv = padZero(year, 4)
         + '.'
         + padZero(month, 2)
         + '.'
         + padZero(day, 2)
         + ' '
         + padZero(hours, 2)
         + ':'
         + padZero(minutes, 2)
         + ':'
         + padZero(seconds, 2)
  return rv
}

function padZero (arg, digits) {
  arg += ''
  while (arg.length < digits) {
    arg = '0' + arg
  }
  return arg
}

function apply (o, c) {
  for (var p in c) {
    o[p] = c[p]
  }
  return o
}

module.exports =
  { dateTime: dateTime
  , parseDate: parseDate
  , padZero: padZero
  , apply: apply
  }
