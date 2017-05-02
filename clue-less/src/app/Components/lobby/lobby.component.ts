//angular
import { Component, OnInit } from '@angular/core';

//custom classes
import { Player } from "../../Classes/player.class";

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  //properties
  player: Player;

}