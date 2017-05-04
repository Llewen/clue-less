import {ServerUser} from '../../common/Classes/serverUser.class';
import { Lobby } from '../../common/Classes/lobby.class';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var players: Array<ServerUser> = new Array<ServerUser>();
var lobbies: Array<Lobby> = new Array<Lobby>();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log("new user. Socket ID: " + socket.id.toString());
  console.log("Sending initial player list of: " + JSON.stringify(players.map(p => p.user)));
  io.sockets.connected[socket.id].emit("player list", players);
  console.log("Sending initial lobby list of: " + JSON.stringify(lobbies));
  io.sockets.connected[socket.id].emit("lobby list", lobbies);

  socket.on('chat message', function(msg){
    console.log("chat message: " + JSON.stringify(msg));
    io.emit('chat message', msg);
  });

//releated to the game
socket.on('game message', function(id, msg){
  console.log("sending game message to: " + id.toString() + JSON.stringify(msg) );
  socket.broadcast.to(id).emit('game message', msg);
});

socket.on('player select', function(id, msg){
  console.log("player: " + msg.user.userName + " chose character: " + msg.user.character);
  socket.broadcast.to(id).emit('player select', msg);
});

socket.on('move message', function(id, msg){
  console.log(msg);
  io.to(id).emit('move message', msg);
});


//related to lobbies
  socket.on('add lobby', function(msg){
    lobbies.push(msg);
    console.log("add lobby: " + JSON.stringify(msg));
    socket.join(msg.name);
    io.emit('add lobby', msg);
  });

  socket.on('remove lobby', function(msg){
    removeLobby(socket.id);
    console.log("remove lobby: " + JSON.stringify(msg.name));
    socket.leave(msg.name);
    io.emit('remove lobby', msg);
  });

  socket.on('update lobby', function(msg){
    updateLobby(msg);
    console.log("updating lobby: " + JSON.stringify(msg));
    socket.join(msg.name);
    socket.broadcast.emit('update lobby', msg)
  });


  //related to users
  socket.on('add user', function(msg){
    var newUser = new ServerUser(socket.id, msg);
    players.push(newUser);
    console.log("add server user: " + JSON.stringify(newUser));
    io.sockets.connected[socket.id].emit('register user', socket.id);
    io.emit('add user', newUser);
  });

  socket.on('remove user', function(msg){
    removeUser(socket.id);
    console.log("remove user: " + JSON.stringify(msg));    
    io.emit('remove user', msg);
  })

  //disonnect
  socket.on('disconnect', function(){
    removeUser(socket.id);
    var lobbyName = removePlayersFromLobby(socket.id);
    if(lobbyName)
    {
      socket.leave(lobbyName);
    }
    removeLobby(socket.id);
    io.emit("player list", players);
    io.emit("lobby list", lobbies);
    console.log("user disconnected. Socket ID: " + socket.id.toString());
  });
});


http.listen(3001, function(){
  console.log('listening on *:3001');
});

function removeUser(serverId)
{
    var index = players.map(p => p.serverId).indexOf(serverId);
    if(index != -1)
    {
      players.splice(index, 1);
    }
}

function removeLobby(serverId)
{
    var index = lobbies.map(p => p.host.serverId).indexOf(serverId);
    if(index != -1)
    {
      lobbies.splice(index, 1);
    }
}

function removePlayersFromLobby(serverId)
{
  for(var x = 0; x < lobbies.length; x++)
  {
    var lobby = lobbies[x];
    var playerIndex = lobby.players.map(p => p.serverId).indexOf(serverId);
    if(playerIndex != -1)
    {
      lobby.players.splice(playerIndex, 1);
      io.emit('update lobby', lobby);
      return lobby.name;
    }
  }
}

function updateLobby(lobby: Lobby)
{
    var index = lobbies.map(p => p.host.serverId).indexOf(lobby.host.serverId);
    if(index != -1)
    {
      lobbies[index].players = lobby.players;
      lobbies[index].game = lobby.game;
    }
}