//this component is where the logic for the game will be held

//angular
import { Component, OnInit } from '@angular/core';

//socket.io
import * as io from 'socket.io-client'

//other vendors
import {SelectItem} from 'primeng/primeng';

//custom classes
import {Game} from "../../Classes/game.class";
import {GameCharacter} from "../../Classes/gameCharacter.class";

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  socket;
  isLoggedIn: boolean = false;
  message: Game = new Game();  //This is saying that message is of type ChatMessage and instantiates a blank ChatMessage object
  messages = new Array<Game>();
  characters = [];
  boardPath;
  characterImgPath;
  imageRoot;
 //initialization of component for angular
  ngOnInit(){
    this.socket = io("http://localhost:3001/"); // will probably move out the url here to a new file so that it isn't hard-coded in every component

    this.characters.push({label: "Miss Scarlet", value: new GameCharacter("Miss Scarlet")});
    this.characters.push({label: "Colonel Mustard", value: new GameCharacter("Colonel Mustard")});
    this.characters.push({label: "Professor Plum", value: new GameCharacter("Professor Plum")});
    this.characters.push({label: "Mrs. White", value: new GameCharacter("Mrs. White")});
    this.characters.push({label: "Mr. Green", value: new GameCharacter("Mr. Green")});
    this.characters.push({label: "Ms. Peacock", value: new GameCharacter("Ms. Peacock")});

    this.socket.on('game message', (msg) => this.receiveMessage(msg));
    this.imageRoot = "../../../../assets/images/";
    this.boardPath = this.imageRoot + "Board.png";

    this.characterImgPath = {
      ColMustard: this.imageRoot + "Colonel Mustard.png",
      MissWhite: this.imageRoot + "Miss White.jpeg",
      MrGreen: this.imageRoot + "Mr. Green.png",
      MrsPeacock: this.imageRoot + "Mrs. Peacock.png",
      ProfPlum: this.imageRoot + "Prof Plum.png",
      MissScarlett: this.imageRoot + "Miss Scarlett.png",
    }
  }

  //functions
  sendMessage() {
    this.socket.emit('game message', this.message);
    return false;
  }

  receiveMessage(msg: Game){
    this.messages.push(msg);
  }

  logIn(userName: string){
    this.message.userName = userName;
    this.isLoggedIn = true;
  }
}