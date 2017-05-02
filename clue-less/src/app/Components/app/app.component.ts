//angular
import { Component, OnInit } from '@angular/core';

//socket io
import * as io from 'socket.io-client'

//custom classes
import { Player } from '../../Classes/player.class';


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
      this.socket.on('new user', (msg) => this.receiveNewUser(msg));

      this.route = "lobby"; 
    }

   //methods

   //pertaining to navbar
   navigate(route: string) {
      this.route = route;
   }

   logOut()
   {
     this.socket.emit('user message', this.player);     
     this.player = new Player("");
     this.isLoggedIn = false;
     this.navigate("lobby");
   }

   //pertaining to log-in
   receiveNewUser(user: Player) {
     let existingPlayerIndex = this.playerList.map(p => p.userName).indexOf(user.userName);
     if(existingPlayerIndex !== -1)
     {
        this.playerList.splice(existingPlayerIndex, 1);
     }
     else{
       this.playerList.push(user);
     }
   }

   addUser(userName: string){
    this.playerList.forEach((user) => 
    {
      this.isValidUserName = true;
      if(user.userName.toLowerCase() == userName.toLowerCase())
      {
        this.isValidUserName = false;
      }
    });

    if(this.isValidUserName)
    {
      this.player.userName = userName;
      this.socket.emit('user message', this.player);
      this.isLoggedIn = true;
      this.navigate("lobby");
    }
   }
}