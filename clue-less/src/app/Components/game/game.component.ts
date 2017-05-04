//this component is where the logic for the game will be held

//angular
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

//other vendors
import {SelectItem} from 'primeng/primeng';

//custom classes
import {Lobby} from '../../../../../common/Classes/lobby.class';
import {ServerUser} from '../../../../../common/Classes/serverUser.class';
import {Game} from '../../../../../common/Classes/game.class';
import {Player} from '../../../../../common/Classes/player.class';
import {Room} from '../../../../../common/Classes/room.class';

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
  isValidCharacterSelection: boolean = true;
  closeCharacterDialog: boolean = false;
  allPlayersHaveChosen: boolean = false;
  hasMoved: boolean = false;
  logMessages: Array<string>;
  chosenCharacter = {"character": "", "color": ""};
  characterSelectionDropdown = [{label:'Select Character', value: null},
                                {label:'Miss Scarlet', value: {"character": 'Miss Scarlet', "color": 'red'}},
                                {label:'Colonel Mustard', value: {"character": 'Colonel Mustard', "color": 'yellow'}},
                                {label:'Mrs. White', value: {"character": 'Mrs. White', "color": 'white'}},
                                {label:'Mr. Green', value: {"character": 'Mr. Green', "color": 'green'}},
                                {label:'Mrs. Peacock', value: {"character": 'Mrs. Peacock', "color": 'blue'}},
                                {label:'Professor Plum', value: {"character": 'Professor Plum', "color": 'purple'}}];

 //constructor, watchers
  ngOnInit(){
    this.game = this.lobby.game;
    this.logMessages = new Array<string>();

    //server messages
    this.socket.on('game message', (msg) => this.updateGame(msg));
    this.socket.on('player select', (msg) => this.selectPlayer(msg));
    this.socket.on('move message', (msg) => this.addToLog(msg));
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
  }

  updateGame(game: Game)
  {
    this.game = game;
    let playerIndex = this.game.players.map(p => p.serverId).indexOf(this.player.serverId);
    this.player = this.game.players[playerIndex];
    
  }

  selectPlayer(player: ServerUser)
  {
    let playerIndex = this.game.players.map(p => p.serverId).indexOf(player.serverId);

    if(playerIndex != -1)
    {
      this.game.players[playerIndex].user.character = player.user.character;
      this.game.players[playerIndex].user.color = player.user.color;
    }

    this.checkIfAllHaveChosen();
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
    let alreadyChosenIndex = this.game.players.map(p => p.user.character).indexOf(this.chosenCharacter.character);
    if(alreadyChosenIndex != -1 && this.game.players[alreadyChosenIndex].serverId != this.player.serverId)
    {
      this.isValidCharacterSelection = false;
    }
    else
    {
      let playerIndex = this.game.players.map(p => p.serverId).indexOf(this.player.serverId);
      if(playerIndex != -1)
      {
        this.player.user.character = this.chosenCharacter.character;
        this.player.user.color = this.chosenCharacter.color;

        this.game.players[playerIndex].user.character = this.player.user.character;
        this.game.players[playerIndex].user.color = this.player.user.color;        
      }

      this.closeCharacterDialog = true;
      this.socket.emit('player select', this.lobby.name, this.player);
      this.checkIfAllHaveChosen();      
    }
  }

  checkIfAllHaveChosen(){
    let allChosen = true;
    this.game.players.forEach((p) => {
      if(!p.user.character || p.user.character == "")
      {
        allChosen = false;
      }
    });

    if(allChosen)
    {
      this.game.turnIndex = 0;
      this.allPlayersHaveChosen = allChosen;
      this.setInitialPositions();    
      this.setTurn();        
    }
  }

  setTurn()
  {
    let currentCharacterTurn = this.game.turnOrder[this.game.turnIndex];

    let playerIndex = this.game.players.map(p => p.user.character).indexOf(currentCharacterTurn);
    if(playerIndex != -1)
    {
      if(this.game.players[playerIndex].serverId == this.player.serverId)
      {
        this.player.user.isTurn = true;
      }
      this.game.players[playerIndex].user.isTurn = true;
    }
    else{
      if(this.game.turnIndex == 5)
      {
        this.game.turnIndex = 0;
      }
      else
      {
        this.game.turnIndex += 1;
      }
      this.setTurn();
    }
  }

  endTurn()
  {
    if(this.hasMoved)
    {
      if(this.game.turnIndex == 5)
      {
        this.game.turnIndex = 0;
      }
      else{
        this.game.turnIndex += 1;
      }

      this.player.user.isTurn = false;
      this.hasMoved = false;
      this.setTurn();
      this.socket.emit('game message', this.lobby.name, this.game);
    }
    else
    {
      alert("You must move before ending your turn");
    }
  }

  setInitialPositions()
  {
    this.game.players.forEach((p) => {
      switch(p.user.character)
      {
        case "Miss Scarlet":{
          this.game.Hallway2.players.push(p);
          break;
        }

        case "Colonel Mustard":{
          this.game.Hallway5.players.push(p);
          break;
        }

        case "Mrs. White": {
          this.game.Hallway12.players.push(p);
          break;
        }

        case "Mr. Green": {
          this.game.Hallway11.players.push(p);
          break;
        }

        case "Mrs. Peacock": {
          this.game.Hallway8.players.push(p);
          break;
        }

        case "Professor Plum": {
          this.game.Hallway3.players.push(p);
          break;
        }
      }
    });
    
  }

  moveIfValid(movingTo: Room)
  {
    if(this.player.user.isTurn && !this.hasMoved)
    {
      var currentRoom = this.findContainingRoom();
      if(currentRoom.neighbors.indexOf(movingTo.name) != -1)
      {
        if(movingTo.players.length < movingTo.capacity)
        {
          let currentRoomPlayerIndex = currentRoom.players.map(p => p.serverId).indexOf(this.player.serverId);
          currentRoom.players.splice(currentRoomPlayerIndex, 1);
          movingTo.players.push(this.player);
          this.hasMoved = true;
          this.socket.emit('move message', this.lobby.name, this.player.user.character + " moved to " + movingTo.name);
          this.socket.emit('game message', this.lobby.name, this.game);
        }
        else{
          alert("Only 1 player may occupy a hallway at a time.");
        }
      }
    }
  }

  //this function is disgusting.  Avert your gaze!
  findContainingRoom()
  {
    if(this.game.Study.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Study;
    }
    else if(this.game.Hallway1.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway1;
    }
    else if(this.game.Hall.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hall;
    }
    else if(this.game.Hallway2.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway2;
    }
    else if(this.game.Lounge.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Lounge;
    }
    else if(this.game.Hallway3.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway3;
    }
    else if(this.game.Hallway4.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway4;
    }
    else if(this.game.Hallway5.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway5;
    }
    else if(this.game.Library.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Library;
    }
    else if(this.game.Hallway6.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway6;
    }
    else if(this.game.BilliardRoom.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.BilliardRoom;
    }
    else if(this.game.Hallway7.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway7;
    }
    else if(this.game.DiningRoom.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.DiningRoom;
    }
    else if(this.game.Hallway8.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway8;
    }
    else if(this.game.Hallway9.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway9;
    }
    else if(this.game.Hallway10.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway10;
    }
    else if(this.game.Conservatory.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Conservatory;
    }
    else if(this.game.Hallway11.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway11;
    }
    else if(this.game.BallRoom.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.BallRoom;
    }
    else if(this.game.Hallway12.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Hallway12;
    }
    else if(this.game.Kitchen.players.map(p => p.serverId).indexOf(this.player.serverId) != -1)
    {
      return this.game.Kitchen;
    }
  }


addToLog(msg: string)
{
  this.logMessages.push(msg);
}

}