/**
 * Module dependencies.
 */
var express = require('express')
  , http = require('http')
  , path = require('path')
  , streams = require('./app/streams.js')();

var app = express()
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// all environments
//app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routing
require('./app/routes.js')(app, streams);

/**
 * Socket.io event handling
 */
require('./app/socketHandler.js')(io, streams);
/**
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));

}); */

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '174.129.132.238'

server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});