"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverUser_class_1 = require("../../common/Classes/serverUser.class");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = new Array();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    console.log("new user. Socket ID: " + socket.id.toString());
    console.log("Sending initial player list of: " + JSON.stringify(players.map(p => p.user)));
    io.sockets.connected[socket.id].emit("player list", players.map(p => p.user));
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
    socket.on('add user', function (msg) {
        players.push(new serverUser_class_1.ServerUser(socket.id, msg));
        console.log("add server user: " + socket.id.toString() + JSON.stringify(msg));
        io.emit('add user', msg);
    });
    socket.on('remove user', function (msg) {
        removeUser(socket.id);
        console.log("remove user: " + JSON.stringify(msg.userName));
        io.emit('remove user', msg);
    });
    socket.on('disconnect', function () {
        removeUser(socket.id);
        console.log("user disconnected. Socket ID: " + socket.id.toString());
    });
});
http.listen(3001, function () {
    console.log('listening on *:3001');
});
function removeUser(serverId) {
    var index = players.map(p => p.serverId).indexOf(serverId);
    if (index != -1) {
        players.splice(index, 1);
    }
}
//# sourceMappingURL=index.js.map