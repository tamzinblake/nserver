var express = require('express')
var template = require('template')

function onLoad() {
  var app = express.createServer()

  app.get('/', function(req,res) {
    res.send( 'You may be looking for'
            + '<a href="http://lesswrong.com">Less Wrong</a>'
            )
  })

  app.get('/nrecipe/', function(req,res) {
    res.send(template.process('index'))
  })

  app.listen(3000)
}