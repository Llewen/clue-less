//angular
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

//custom classes
import { Player } from "../../../../../common/Classes/player.class";
import { Lobby } from "../../../../../common/Classes/lobby.class";

@Component({
  selector: 'lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  //private input properties
  private _lobbyList: Array<Lobby>;
  private _isValid: boolean;
  private _isLoggedIn: boolean;

  //inputs
    @Input() set lobbyList(lobbyList: Array<Lobby>){
        this._lobbyList = lobbyList;
    }
    get lobbyList(): Array<Lobby> { return this._lobbyList; }

    @Input() set isValid(isValid: boolean){
        this._isValid = isValid;
    }
    get isValid(): boolean { return this._isValid; }

    @Input() set isLoggedIn(isLoggedIn: boolean){
        this._isLoggedIn = isLoggedIn;
    }
    get isLoggedIn(): boolean { return this._isLoggedIn; }
    
    //event outputs
    @Output() addLobby = new EventEmitter<string>();

    //component properties
    newLobbyName: string;
    showDialog: boolean = false;

  //constructor, watchers
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    }

    joinLobby(lobby: Lobby)
    {
      console.log("wish to join: " + lobby.name);
    }

    createLobby()
    {
      this.addLobby.emit(this.newLobbyName);
    }

    showCreateLobbyDialog()
    {
      this.showDialog = true;
    }
}