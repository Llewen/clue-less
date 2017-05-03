//angular
import { Component, OnInit } from '@angular/core';

//socket io
import * as io from 'socket.io-client'

//custom classes
import { ServerUser } from '../../../../../common/Classes/serverUser.class';
import { Lobby } from '../../../../../common/Classes/lobby.class';
import { Player } from '../../../../../common/Classes/player.class';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
   //server and shared properties
   socket;   
   playerList: Array<ServerUser> = new Array<ServerUser>();
   lobbyList: Array<Lobby> = new Array<Lobby>();

   //navMenu component properties
   isLoggedIn: boolean = false;

   //userLogin component properties
   isValidUserName: boolean = true;

   //lobby component properties
   isValidLobbyName: boolean = true;
   
   //local properties
   route: string;
   player: ServerUser = new ServerUser("", new Player(""));
   

   //constructors
   ngOnInit(){
      this.socket = io("http://localhost:3001/");

      //initial messages from server
      this.socket.on('player list', (msg) => this.initializePlayers(msg));
      this.socket.on('lobby list', (msg) => this.initializeLobby(msg));

      //server messages around logged on users
      this.socket.on('remove user', (msg) => this.removeUserFromPlayerList(msg));
      this.socket.on('add user', (msg) => this.addUserToPlayerList(msg));
      this.socket.on('register user', (msg) => { this.player.serverId = msg; });

      //server messages around lobby list
      this.socket.on('remove lobby', (msg) => this.removeLobbyFromLobbyList(msg));
      this.socket.on('add lobby', (msg) => this.addLobbyToLobbyList(msg));
      this.socket.on('update lobby', (msg) => this.updateLobbyInLobbyList(msg));

      this.route = "lobby"; 
    }

   //methods

   //pertaining to navbar
   navigate(route: string) {
      this.route = route;
   }

   //pertaining to initializing variables from server
   initializePlayers(players: Array<ServerUser>)
   {
     this.playerList = players;
   }

   initializeLobby(lobbies: Array<Lobby>)
   {
     this.lobbyList = lobbies;
   }


   //pertaining to log-in, log-out of users
   addUserToPlayerList(user: ServerUser){
      this.playerList.push(user);
   }

   removeUserFromPlayerList(user: ServerUser){
      let existingPlayerIndex = this.playerList.map(p => p.user.userName).indexOf(user.user.userName);
      if(existingPlayerIndex != -1)
      {
        this.playerList.splice(existingPlayerIndex, 1);
      }
   }

   addUser(userName: string){    
    this.isValidUserName = true;     
    this.playerList.map(x => x.user).forEach((user) => 
    {
      if(user.userName.toLowerCase() == userName.toLowerCase())
      {
        this.isValidUserName = false;
      }
    });

    if(this.isValidUserName)
    {
      this.player.user.userName = userName;
      this.socket.emit('add user', this.player.user);
      this.isLoggedIn = true;
      this.navigate("lobby");
    }
   }

   logOut()
   {
     this.socket.emit('remove user', this.player);     
     this.player = new ServerUser("", new Player(""));
     this.isLoggedIn = false;
     this.navigate("lobby");
   }

   //pertaining to lobby creation
   addNewLobby(lobbyName: string){
     this.isValidLobbyName = true;
     this.lobbyList.forEach((lob) => {
        if(lob.name.toLowerCase() == lobbyName.toLowerCase())
        {
          this.isValidLobbyName = false;
        }
     });

     if(this.isValidLobbyName)
     {
        let newLobby = new Lobby(lobbyName, this.player);
        newLobby.players.push(this.player);
        this.socket.emit('add lobby', newLobby)
        this.navigate("game");
     }
   }

   removeLobbyFromLobbyList(lobby: Lobby)
   {
     let existingLobbyIndex = this.lobbyList.map(p => p.host.serverId).indexOf(lobby.host.serverId);
     if(existingLobbyIndex != -1)
     {
       this.lobbyList.splice(existingLobbyIndex, 1);
     }
   }

   addLobbyToLobbyList(lobby: Lobby)
   {
      this.lobbyList.push(lobby);
   }

   joinLobby(lobby: Lobby)
   {
      lobby.players.push(this.player);
      this.socket.emit('update lobby', lobby);
      this.navigate("game");
   }

   updateLobbyInLobbyList(lobby: Lobby)
   {
     let existingLobbyIndex = this.lobbyList.map(p => p.host.serverId).indexOf(lobby.host.serverId);
     if(existingLobbyIndex != -1)
     {
       this.lobbyList[existingLobbyIndex].players = lobby.players;
     }
   }
}