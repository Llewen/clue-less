import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'playing-game',
  templateUrl: './playing-game.component.html',
  styleUrls: ['./playing-game.component.css']
})
export class PlayingGameComponent implements OnInit {

  imageRoot;
  imagePaths;
  

  constructor() { 
    this.imageRoot = "../../../../assets/images/";
    this.imagePaths = {
      ColMustard: this.imageRoot + "Colonel Mustard.png",
      MissWhite: this.imageRoot + "Miss White.png",
      MrGreen: this.imageRoot + "Mr. Green.png",
      MrsPeacock: this.imageRoot + "Mrs. Peacock.png",
      ProfPlum: this.imageRoot + "Prof Plum.png",
      MissScarlett: this.imageRoot + "Miss Scarlett.png",
    }
  }

  ngOnInit() {
  }

}
