var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = new Array();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    console.log("new user. Socket ID: " + socket.id.toString());
    socket.on('chat message', function (msg) {
        console.log("chat message: " + JSON.stringify(msg));
        io.emit('chat message', msg);
    });
    socket.on('game message', function (msg) {
        console.log("game message: " + JSON.stringify(msg));
        io.emit('game message', msg);
    });
    socket.on('lobby message', function (msg) {
        console.log("lobby message: " + JSON.stringify(msg));
        io.emit('lobby message', msg);
    });
    socket.on('user message', function (msg) {
        console.log("user message: " + JSON.stringify(msg));
        io.emit('user message', msg);
    });
    socket.on('disconnect', function () {
        console.log("user disconnected. Socket ID: " + socket.id.toString());
    });
});
http.listen(3001, function () {
    console.log('listening on *:3001');
});
//# sourceMappingURL=index.js.map