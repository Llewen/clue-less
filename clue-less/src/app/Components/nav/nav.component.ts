import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange  } from '@angular/core';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  //private properties
  private _userName: string;
  private _isLoggedIn: boolean;

  @Input() set userName(uName: string){
    this._userName = uName;
  }
  get userName(): string { return this._userName; }

  @Input() set isLoggedIn(loggedIn: boolean){
    this._isLoggedIn = loggedIn;
  }
  get isLoggedIn(): boolean { return this._isLoggedIn; }

  //event outputs
  @Output() navigate = new EventEmitter<string>();
  @Output() logOut = new EventEmitter();

  //constructor, watchers
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
  }

  //internal methods
  routeToLoginPage() {
    this.navigate.emit("userLogin");
  }

  routeToLobbyPage() {
    this.navigate.emit("lobby");
  }

  logoutUser() {
    this.logOut.emit();
  }
}
