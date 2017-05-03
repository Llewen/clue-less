"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const serverUser_class_1 = require("../../common/Classes/serverUser.class");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = new Array();
var lobbies = new Array();
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
io.on('connection', function (socket) {
    console.log("new user. Socket ID: " + socket.id.toString());
    console.log("Sending initial player list of: " + JSON.stringify(players.map(p => p.user)));
    io.sockets.connected[socket.id].emit("player list", players);
    console.log("Sending initial lobby list of: " + JSON.stringify(lobbies));
    io.sockets.connected[socket.id].emit("lobby list", lobbies);
    socket.on('chat message', function (msg) {
        console.log("chat message: " + JSON.stringify(msg));
        io.emit('chat message', msg);
    });
    socket.on('game message', function (msg) {
        console.log("game message: " + JSON.stringify(msg));
        io.emit('game message', msg);
    });
    //related to lobbies
    socket.on('add lobby', function (msg) {
        lobbies.push(msg);
        console.log("add lobby: " + JSON.stringify(msg));
        io.emit('add lobby', msg);
    });
    socket.on('remove lobby', function (msg) {
        removeLobby(socket.id);
        console.log("remove lobby: " + JSON.stringify(msg.name));
        io.emit('remove lobby', msg);
    });
    //related to users
    socket.on('add user', function (msg) {
        var newUser = new serverUser_class_1.ServerUser(socket.id, msg);
        players.push(newUser);
        console.log("add server user: " + JSON.stringify(newUser));
        io.sockets.connected[socket.id].emit('register user', socket.id);
        io.emit('add user', newUser);
    });
    socket.on('remove user', function (msg) {
        removeUser(socket.id);
        console.log("remove user: " + JSON.stringify(msg));
        io.emit('remove user', msg);
    });
    //disonnect
    socket.on('disconnect', function () {
        removeUser(socket.id);
        removeLobby(socket.id);
        io.emit("player list", players);
        io.emit("lobby list", lobbies);
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
function removeLobby(serverId) {
    var index = lobbies.map(p => p.host.serverId).indexOf(serverId);
    if (index != -1) {
        lobbies.splice(index, 1);
    }
}
//# sourceMappingURL=index.js.map