var express = require('express')
var nrecipe = require('./nrecipe/nrecipe')

var app = express.createServer()

app.get('/', function(req,res) {
  res.send( 'You may be looking for'
          + '<a href="http://lesswrong.com">Less Wrong</a>'
          )
})

app.get('/nrecipe*?', function(req,res) {
  nrecipe.reroute(req,res)
})

app.listen(3000)
