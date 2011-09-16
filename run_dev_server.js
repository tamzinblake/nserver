#!/usr/local/bin/node

var child_process = require('child_process')
  , daemon = require('daemon')
  , fs = require('fs')
  , sys = require('sys')
  , lockFile = '/var/run/nserver.pid'

switch(process.argv[2]) {
  case "stop": {
    process.kill(parseInt(fs.readFileSync(lockFile)))
    process.exit(0)
    break
  }
  case "start": {
    daemon.start()
    daemon.lock(lockFile)
    break
  }
  default: {
    sys.puts('Usage: [start|stop]')
    process.exit(0)
  }
}

var dev_server =
    { process: null
    , files: []
    , restarting: false
    , restart: function () {
        this.restarting = true
        sys.debug('DEVSERVER: Stopping server for restart')
        this.process.kill()
      }
    , start: function () {
        var that = this
        sys.debug('DEVSERVER: Starting server')
        that.watchFiles()
        this.process = child_process.spawn(process.ARGV[0], ['server.js'])
        this.process.stdout
            .addListener( 'data'
                        , function (data) {
                            process.stdout.write(data)
                          }
                        )
        this.process.stderr
            .addListener( 'data'
                        , function (data) {
                            sys.print(data)
                          }
                        )
        this.process
            .addListener( 'exit'
                        , function (code) {
                            sys.debug('DEVSERVER: Child process exited: '+code)
                            this.process = null
                            if (that.restarting) {
                              that.restarting = true
                              that.unwatchFiles()
                              that.start()
                            }
                          }
                        )
      }
    , watchFiles: function () {
        var that = this
        child_process
          .exec( 'find -L . | grep -v "[.]git"'
               , function (error, stdout, stderr) {
                   var files = stdout.trim().split("\n")
                   files.forEach( function (file) {
                     that.files.push(file)
                     fs.watchFile( file
                                 , {interval : 500}
                                 , function (curr, prev) {
                                     if ( curr.mtime.valueOf() != prev.mtime.valueOf() || curr.ctime.valueOf() != prev.ctime.valueOf()) {
                                       sys.debug('DEVSERVER: Restarting because of changed file at ' + file)
                                       dev_server.restart()
                                     }
                                   }
                                 )
                   } )
                 }
               )
      }
    , unwatchFiles: function () {
        this.files.forEach( function (file) {
          fs.unwatchFile(file)
        } )
        this.files = []
      }
    }

dev_server.start()
