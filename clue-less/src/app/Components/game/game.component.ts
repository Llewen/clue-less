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
import {Suggestion} from '../../Classes/suggestion.class';
import {SuggestionReply} from '../../Classes/suggestionReply.class';

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
  showSuggestionDialog: boolean = false;
  showSuggestionReplyDialog: boolean = false;
  showAccusationDialog: boolean = false;
  isValidSuggestion: boolean = true;
  isValidSuggestionReply: boolean = true;
  isValidAccusation: boolean = true;
  suggestion: Suggestion = new Suggestion();
  suggestionReply: SuggestionReply = new SuggestionReply();
  makingSuggestion: boolean = false;
  logMessages: Array<string>;
  chosenCharacter = {"character": "", "color": ""};

  //drop downs
  characterSelectionDropdown = [{label:'Select Character', value: null},
                                {label:'Miss Scarlet', value: {"character": 'Miss Scarlet', "color": 'red'}},
                                {label:'Colonel Mustard', value: {"character": 'Colonel Mustard', "color": 'yellow'}},
                                {label:'Mrs. White', value: {"character": 'Mrs. White', "color": 'white'}},
                                {label:'Mr. Green', value: {"character": 'Mr. Green', "color": 'green'}},
                                {label:'Mrs. Peacock', value: {"character": 'Mrs. Peacock', "color": 'blue'}},
                                {label:'Professor Plum', value: {"character": 'Professor Plum', "color": 'purple'}}];

suggestionCharacterDD = [{label:'Select Character', value: null},
                        {label:'Miss Scarlet', value: 'Miss Scarlet'},
                        {label:'Colonel Mustard', value: 'Colonel Mustard'},
                        {label:'Mrs. White', value: 'Mrs. White'},
                        {label:'Mr. Green', value: 'Mr. Green'},
                        {label:'Mrs. Peacock', value: 'Mrs. Peacock'},
                        {label:'Professor Plum', value: 'Professor Plum'}];

accusationRoomDD =     [{label:'Select Room', value: null},
                        {label:'Study', value: 'Study'},
                        {label:'Hall', value: 'Hall'},
                        {label:'Lounge', value: 'Lounge'},
                        {label:'Billiard Room', value: 'Billiard Room'},
                        {label:'Dining Room', value: 'Dining Room'},
                        {label:'Conservatory', value: 'Conservatory'},
                        {label:'Ball Room', value: 'Ball Room'},
                        {label:'Kitchen', value: 'Kitchen'}];                            

suggestionWeaponDD = [{label:'Select Weapon', value: null},
                        {label:'Rope', value: 'Rope'},
                        {label:'Lead Pipe', value: 'Lead Pipe'},
                        {label:'Knife', value: 'Knife'},
                        {label:'Wrench', value: 'Wrench'},
                        {label:'Candlestick', value: 'Candlestick'},
                        {label:'Revolver', value: 'Revolver'}];  

suggestionReplyDD = [{label:'Select a Card', value: null}];

 //constructor, watchers
  ngOnInit(){
    this.game = this.lobby.game;
    this.logMessages = new Array<string>();

    //server messages
    this.socket.on('game message', (msg) => this.updateGame(msg));
    this.socket.on('player select', (msg) => this.selectPlayer(msg));
    this.socket.on('log message', (msg) => this.addToLog(msg));
    this.socket.on('make suggestion', (msg) => this.handleSuggestion(msg));
    this.socket.on('suggestion reply', (msg) => this.handleSuggestionReply(msg));
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

    this.game.initializeCardsAndCaseFile();

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
          this.socket.emit('log message', this.lobby.name, this.player.user.character + " moved to " + movingTo.name);
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

 findContainingRoomForSuggestion(player: ServerUser)
  {
    if(this.game.Study.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Study;
    }
    else if(this.game.Hallway1.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway1;
    }
    else if(this.game.Hall.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hall;
    }
    else if(this.game.Hallway2.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway2;
    }
    else if(this.game.Lounge.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Lounge;
    }
    else if(this.game.Hallway3.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway3;
    }
    else if(this.game.Hallway4.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway4;
    }
    else if(this.game.Hallway5.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway5;
    }
    else if(this.game.Library.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Library;
    }
    else if(this.game.Hallway6.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway6;
    }
    else if(this.game.BilliardRoom.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.BilliardRoom;
    }
    else if(this.game.Hallway7.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway7;
    }
    else if(this.game.DiningRoom.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.DiningRoom;
    }
    else if(this.game.Hallway8.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway8;
    }
    else if(this.game.Hallway9.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway9;
    }
    else if(this.game.Hallway10.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway10;
    }
    else if(this.game.Conservatory.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Conservatory;
    }
    else if(this.game.Hallway11.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway11;
    }
    else if(this.game.BallRoom.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.BallRoom;
    }
    else if(this.game.Hallway12.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Hallway12;
    }
    else if(this.game.Kitchen.players.map(p => p.serverId).indexOf(player.serverId) != -1)
    {
      return this.game.Kitchen;
    }
  }

  addToLog(msg: string)
  {
    this.logMessages.push(msg);
  }

  makeSuggestion()
  {
    let containRoom = this.findContainingRoom();

    if(containRoom.name.indexOf("Hallway") == -1)
    {
      if(this.suggestion.character && this.suggestion.weapon)
      {
        this.suggestion.room = containRoom.name; //you can only make suggestion for room that you are in
        this.isValidSuggestion = true;
        this.makingSuggestion = true;
        this.setWhoIsNextForSuggestion(this.game.turnIndex + 1);
        if(this.suggestion.to == this.player.serverId)
        {
          this.makingSuggestion = false;
          //display some sort of message to user here saying that the suggestion could not be disproved.
          alert("Invalid Selection");
        }
        else
        {
          //find character to be moved
          let characterToMove = this.game.players.map(p => p.user.character).indexOf(this.suggestion.character);

          // find the starting location of this character
           let previousRoom:Room= this.findContainingRoomForSuggestion(this.game.players[characterToMove]);

          // Remove from current room
             let currentRoomPlayerIndex = previousRoom.players.indexOf(this.game.players[characterToMove]);
             previousRoom.players.splice(currentRoomPlayerIndex, 1);

          //Perform the move

          containRoom.players.push(this.game.players[characterToMove]);

          this.socket.emit('game message', this.lobby.name, this.game);

         // this.addToLog(this.game.players[characterToMove]+"was moved to"+ containRoom.name);
          this.socket.emit('log message', this.lobby.name, this.player.user.character + " made the following suggestion. Character: " + this.suggestion.character + " Room: " + this.suggestion.room + " Weapon: " + this.suggestion.weapon);
          this.socket.emit('make suggestion', this.suggestion);
        }
      }
      else{
        this.isValidSuggestion = false;
        alert("Please select from the dropdown a character and weapon for suggestion");
      }
    }
    else
    {
      alert("You must be in a room to make a suggestion");
    }

    this.hideSuggDialog();
  }

  setWhoIsNextForSuggestion(turnIndex: number)
  {
      let currentCharacterTurn = this.game.turnOrder[turnIndex];

      let playerIndex = this.game.players.map(p => p.user.character).indexOf(currentCharacterTurn);
      if(playerIndex != -1)
      {
        this.suggestion.to = this.game.players[playerIndex].serverId;
        this.suggestion.turnIndexOfReplyingPlayer = turnIndex;
      }
      else{
        let nextTurn = 0;
        if(turnIndex == 5)
        {
          nextTurn = 0;
        }
        else
        {
          nextTurn = turnIndex += 1;
        }
        this.setWhoIsNextForSuggestion(nextTurn);
      }
  }

  handleSuggestionReply(reply: SuggestionReply)
  {
    if(reply.canDisprove)
    {
      //display the card that is contained in reply.card
      this.suggestion = new Suggestion();
    }
    else{
      this.setWhoIsNextForSuggestion(this.suggestion.turnIndexOfReplyingPlayer + 1);
      if(this.suggestion.to == this.player.serverId)
      {
        this.makingSuggestion = false;
        this.suggestion = new Suggestion();
        //again display some sort of message to user saying that the suggestion could not be disproved
      }
      else
      {
        this.socket.emit('make suggestion', this.lobby.name, this.suggestion);        
      }
    }
  }

  handleSuggestion(suggestion: Suggestion)
  {
    //build out card dropdown for user to respond with
    this.player.user.cards.forEach((card) => {
      if(card.value == suggestion.character || card.value == suggestion.room || card. value == suggestion.weapon)
      {
        this.suggestionReplyDD.push({label:card.value, value: card});
      }
    });

    if(this.suggestionReplyDD.length > 1)
    {
      this.showSuggestionReplyDialog = true;
      document.getElementById("suggBtnRoom").innerHTML = "Room" + this.suggestion.room;      
    }
    else
    {
      //auto reply with false for being able to disprove
        this.socket.emit('log message', this.lobby.name, this.player.user.character + " was unable to disprove the suggestion.");      
      this.socket.emit('suggestion reply', new SuggestionReply(false));
    }
  }

  sendSuggestionReply()
  {
    if(this.suggestionReply.card)
    {
      this.isValidSuggestionReply = true;
      this.showSuggestionReplyDialog = false;
      this.suggestionReplyDD = [{label:'Select Room', value: null}];
      this.suggestionReply.canDisprove = true;
      this.socket.emit('log message', this.lobby.name, this.player.user.character + " was able to disprove the suggestion.");            
      this.socket.emit('suggestion reply', this.suggestionReply);
      this.suggestionReply = new SuggestionReply();
    }
    else{
      this.isValidSuggestionReply = false;
    }
  }

  showSuggDialog()
  {
    this.showSuggestionDialog = true;
  }
  
  hideSuggDialog()
  {
    this.showSuggestionDialog = false;
  }

  showAccuseDialog()
  {
    //this dialog is not currently hooked up
    this.showAccusationDialog = true;
  }

  hideAccuseDialog()
  {
    //this dialog is not currently hooked up
    this.showAccusationDialog = false;
  }
  makeAccusation()
  {
    //just check with the games case file and then modify cards if loss or display victory: WHO to all if win
    this.socket.emit('log message', this.lobby.name, this.player.user.character + " made the following suggestion. Character: " + this.suggestion.character + " Room: " + this.suggestion.room + " Weapon: " + this.suggestion.weapon);
    let who: String = this.game.caseFile.who.value;
    let what: String = this.game.caseFile.what.value;
    let where: String = this.game.caseFile.where.value;

    if(this.suggestion.character == who && this.suggestion.room == where && this.suggestion.weapon == what )
    {
        alert("Success! Your are the Winner!")
        alert("The Case File revealed that Mr. Boddy was murdered by "+this.suggestion.character+" in the " + this.suggestion.room + " with the weapon: "+ this.suggestion.weapon);
        this.socket.emit('log message', this.lobby.name, this.player.user.character + "is the Winner!" );
        this.socket.emit('game message', this.lobby.name, this.game);
    }
    else
    {
          alert("Your accusation is invalid. You are now an inactive player, but will remain in the game")
          this.player.ActivePlayer = false;
          this.socket.emit('log message', this.lobby.name, this.player.user.character + " Loss the game!" );
          this.socket.emit('game message', this.lobby.name, this.game);

         // let numOfActivePlayers = this.game.players.filter(function(p >= p.ActivePlayer == true);
    }

    //use this.socket.emit('game message', this.lobby.name, this.game); to update players

    this.hideAccuseDialog();
  }
}