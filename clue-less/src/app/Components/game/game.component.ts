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
  boardPath;
  studyPath;
  hallPath;
  loungePath;
  characterImgPath;
  imageRoot;
  
 //initialization of component for angular
  ngOnInit(){
    this.imageRoot = "../../../../assets/images/";
    this.boardPath = this.imageRoot + "Board.png";
    this.studyPath = this.imageRoot + "Study.png";
    this.hallPath = this.imageRoot + "Hall.png";
    this.loungePath = this.imageRoot + "Lounge.png";


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
}