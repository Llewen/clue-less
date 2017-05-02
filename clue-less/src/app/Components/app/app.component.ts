//angular
import { Component, OnInit } from '@angular/core';

//socket io
import * as io from 'socket.io-client'

//custom classes
import { Player } from '../../../../../common/Classes/player.class';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
   //server and shared properties
   socket;   
   playerList: Array<Player> = new Array<Player>();

   //navMenu component properties
   isLoggedIn: boolean = false;

   //userLogin component properties
   isValidUserName: boolean = true;
   
   //local properties
   route: string;
   player: Player = new Player("");
   

   //constructors
   ngOnInit(){
      this.socket = io("http://localhost:3001/");

      //initial messages from server
      this.socket.on('player list', (msg) => this.initializePlayers(msg));

      //server messages around logged on users
      this.socket.on('remove user', (msg) => this.removeUserFromPlayerList(msg));
      this.socket.on('add user', (msg) => this.addUserToPlayerList(msg));

      this.route = "lobby"; 
    }

   //methods

   //pertaining to navbar
   navigate(route: string) {
      this.route = route;
   }

   //pertaining to initializing variables from server
   initializePlayers(players: Array<Player>)
   {
     this.playerList = players;
   }

   logOut()
   {
     this.socket.emit('remove user', this.player);     
     this.player = new Player("");
     this.isLoggedIn = false;
     this.navigate("lobby");
   }



   //pertaining to log-in, log-out of users
   addUserToPlayerList(user: Player){
      this.playerList.push(user);
   }

   removeUserFromPlayerList(user: Player){
      let existingPlayerIndex = this.playerList.map(p => p.userName).indexOf(user.userName);
      if(existingPlayerIndex != -1)
      {
        this.playerList.splice(existingPlayerIndex, 1);
      }
   }

   addUser(userName: string){    
    this.isValidUserName = true;     
    this.playerList.forEach((user) => 
    {
      if(user.userName.toLowerCase() == userName.toLowerCase())
      {
        this.isValidUserName = false;
      }
    });

    if(this.isValidUserName)
    {
      this.player.userName = userName;
      this.socket.emit('add user', this.player);
      this.isLoggedIn = true;
      this.navigate("lobby");
    }
   }
}