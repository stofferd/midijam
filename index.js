var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var fs = require('fs');
var ejs = require('ejs');
var path = require('path')

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// app.get('/audio/', function(req, res){
//   res.sendFile(__dirname + '/drip.wav');
// });


var filepath = path.join(__dirname, 'drip.wav');

app.get('/audio', function(req, res){
    res.set({'Content-Type': 'audio/mpeg'});
    var readStream = fs.createReadStream(filepath);
    readStream.pipe(res);
})


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    // console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
