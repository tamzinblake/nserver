var express = require('express')
  , conf = require('./etc/conf.js')

var app = express.createServer( express.bodyParser() )
  , required = {}

app.use(express.favicon(__dirname + '/favicon.ico'));

for (var i = 0; i < conf.routes.length; i++) {
  var route = conf.routes[i]
  var method = route.method.match(/^(get|post)$/i) ? route.method.toLowerCase()
             : 'get'
  if (route.name !== undefined) {
    required[route.name] = require(conf.route_root + route.name)
  }
  app[method]( route.path
             , ( route.action !== undefined
               ? route.action
               : rerouteFactory(route))
             )
}

function rerouteFactory (route) {
  return function (req, res) {
    required[route.name](req, res, route.method)
  }
}

app.listen(conf.port || 80)
