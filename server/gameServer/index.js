var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = new Array();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    console.log("new user");
    socket.on('chat message', function (msg) {
        console.log("chat message: " + msg);
        io.emit('chat message', msg);
    });
    socket.on('game message', function (msg) {
        console.log("game message: " + msg);
        io.emit('game message', msg);
    });
    socket.on('lobby message', function (msg) {
        console.log("lobby message: " + msg);
        io.emit('lobby message', msg);
    });
    socket.on('user message', function (msg) {
        console.log("user message: " + msg);
        io.emit('user message', msg);
    });
});
http.listen(3001, function () {
    console.log('listening on *:3001');
});
//# sourceMappingURL=index.js.map