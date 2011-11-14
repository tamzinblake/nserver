/* global require __dirname */
var express = require('express')
  , blog = require('blog')
  , nrecipe = require('nrecipe')
  , netboom = require('netboom')

var app = express.createServer( express.bodyParser() )
  , required = {}

app.use(express.favicon(__dirname + '/htdocs/favicon.ico'));
app.use(express.static(__dirname + '/htdocs'));

app.get(  '/', blog.index)
app.get(  '/blog*?', blog.reroute)
app.post( '/blog*?', blog.reroute)
app.get(  '/nrecipe*?', nrecipe.reroute)
app.post( '/nrecipe*?', nrecipe.reroute)
app.get(  '/netboom*?', netboom.reroute)
app.post( '/netboom*?', netboom.reroute)

app.listen(80)
