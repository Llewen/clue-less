//this component is where the logic for the game will be held

//angular
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

//other vendors
import {SelectItem} from 'primeng/primeng';

//custom classes
import {Lobby} from '../../../../../common/Classes/lobby.class';
import {ServerUser} from '../../../../../common/Classes/serverUser.class';
import {Game} from '../../../../../common/Classes/game.class';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  //private input properties
  private _lobby: Lobby;
  private _player: ServerUser;
  private _socket;

  //inputs
  @Input() set lobby(lobby: Lobby){
      this._lobby = lobby;
  }
  get lobby(): Lobby { return this._lobby; }

  @Input() set player(player: ServerUser){
      this._player = player;
  }
  get player(): ServerUser { return this._player; }

  @Input() set socket(socket){
      this._socket = socket;
  }
  get socket() { return this._socket; }

  //outputs
  //event outputs
  @Output() registerStartGame = new EventEmitter<Lobby>();

  //component specific properties
  game: Game;
  characterImgPath;
  imageRoot;
  isValidCharacterSelection: boolean = true;
  closeCharacterDialog: boolean = false;

 //constructor, watchers
  ngOnInit(){
    this.imageRoot = "../../../../assets/images/";
    this.game = this.lobby.game;

    //server messages
    this.socket.on('game message', (msg) => this.updateGame(msg));

    this.characterImgPath = {
      ColMustard: this.imageRoot + "Colonel Mustard.png",
      MissWhite: this.imageRoot + "Miss White.jpeg",
      MrGreen: this.imageRoot + "Mr. Green.png",
      MrsPeacock: this.imageRoot + "Mrs. Peacock.png",
      ProfPlum: this.imageRoot + "Prof Plum.png",
      MissScarlett: this.imageRoot + "Miss Scarlett.png",
    }
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
  }

  updateGame(game: Game)
  {
    this.game = game;
  }
  

  //functions
  startGame(){
    this.game.isStarted = true;
    this.game.players = this.lobby.players;

    this.lobby.game = this.game;

    //this is to register it with the lobby so new players cannot join
    this.registerStartGame.emit(this.lobby);

    //this is to alert the rest of the players in the game
    this.socket.emit('game message', this.lobby.name, this.game);
  }

  chooseCharacter(){
    let alreadyChosenIndex = this.game.players.map(p => p.user.character).indexOf(this.player.user.character);
    if(alreadyChosenIndex != -1)
    {
      this.isValidCharacterSelection = false;
    }
    else
    {
      let playerIndex = this.game.players.map(p => p.serverId).indexOf(this.player.serverId);
      if(playerIndex != -1)
      {
        this.game.players[playerIndex].user.character = this.player.user.character;
      }

      this.closeCharacterDialog = true;
      this.socket.emit('game message', this.lobby.name, this.game);
    }
  }
}