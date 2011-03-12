var y = require('../yajet');

var yajet = new y.YAJET({})

var templates = { 'index' : 'this is an index'
                , 'error' : '404 not found'
                }

exports.process = function(template, vars) {
  return yajet.compile(templates[template || 'error'])(vars)
}
