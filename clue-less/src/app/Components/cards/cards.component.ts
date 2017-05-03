import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  imageRoot;
  imagePaths;
  

  constructor() { 
    this.imageRoot = "../../../../assets/images/";
    this.imagePaths = {
      ColMustard: this.imageRoot + "Colonel Mustard.png",
      MissWhite: this.imageRoot + "Miss White.jpeg",
      MrGreen: this.imageRoot + "Mr. Green.png",
      MrsPeacock: this.imageRoot + "Mrs. Peacock.png",
      ProfPlum: this.imageRoot + "Prof Plum.png",
      MissScarlett: this.imageRoot + "Miss Scarlett.png",
    }
  }

  ngOnInit() {
  }

}
