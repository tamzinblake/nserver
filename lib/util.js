function dateTime () {
  var currentTime = new Date()
    , year = currentTime.getFullYear()
    , month = currentTime.getMonth() + 1
    , day = currentTime.getDate()
    , hours = currentTime.getHours()
    , minutes = currentTime.getMinutes()
    , seconds = currentTime.getSeconds()

  return padZero(year, 4)
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
}

this.dateTime = dateTime
this.padZero = padZero
this.apply = apply