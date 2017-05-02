//angular
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'user-login',
  templateUrl: './userLogin.component.html',
  styleUrls: ['./userLogin.component.css']
})
export class UserLoginComponent{
    //properties
    userName: string;

    //input properties
    _isValid: boolean;

    //inputs
    @Input() set isValid(isValid: boolean){
        this._isValid = isValid;
    }
    get isValid(): boolean { return this._isValid; }

    //event outputs
    @Output() addUser = new EventEmitter<string>();

    //constructor, watchers
    ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    }

    //methods
    logIn(){
        this.addUser.emit(this.userName);
    }
}