
/**
 * Module dependencies.
 */

var express = require('express'),
    routes  = require('./routes'),
    client  = require('./routes/client'),
    block   = require('./routes/block'),
    http    = require('http'),
    path    = require('path'),
    app     = express();
    server  = app.listen(3000),
    io      = require('socket.io').listen(server);


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/client', client.list);
app.get('/block',  block.list);

io.sockets.on('connection', function(socket) {
    socket.emit('welcome', {'salutation':'TMP36 Sensor output!'});      
});

