/* Each route should have either 'action' or 'name' defined.
 * 'name' is the name of a rerouting module stored under route_root.
 * 'action' is a function that takes (request, response) as params.
 */
module.exports =
  { routes: [ { path: '/'
              , method: 'GET'
              , action: function (req, res) {
                  res.send( 'You may be looking for '
                          + '<a href="http://lesswrong.com">Less Wrong</a>'
                          )
                }
              }
            , { path: '/nrecipe*?'
              , method: 'GET'
              , name: 'nrecipe'
              }
            , { path: '/nrecipe*?'
              , method: 'POST'
              , name: 'nrecipe'
              }
            , { path: '/blog*?'
              , method: 'GET'
              , name: 'blog'
              }
            , { path: '/blog*?'
              , method: 'POST'
              , name: 'blog'
              }
            , { path: '/ext/*?'
              , method: 'GET'
              , action: function (req, res) {
                  res.sendfile('/m/ext/'+req.params[0])
                }
              }
            ]
  , port: 3000
  , route_root: './node_modules/'
  }
