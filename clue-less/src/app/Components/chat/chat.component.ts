//angular
import { Component, OnInit } from '@angular/core';

//socket.io
import * as io from 'socket.io-client'

//custom classes
import { ChatMessage } from '../../Classes/chatMessage.class';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  socket;
  isLoggedIn: boolean = false;
  message: ChatMessage = new ChatMessage();  //This is saying that message is of type ChatMessage and instantiates a blank ChatMessage object
  messages = new Array<ChatMessage>();
 //initialization of component for angular
  ngOnInit(){
    this.socket = io("http://localhost:3001/");

    this.socket.on('chat message', (msg) => this.receiveMessage(msg));
  }

  //functions
  sendMessage() {
    this.socket.emit('chat message', this.message);
    this.message.message = ""; //need to use this to reference the message property of this class, but only in the .ts file not in the template
    return false;
  }

  receiveMessage(msg: ChatMessage){
    this.messages.push(msg);
  }

  logIn(userName: string){
    this.message.userName = userName;
    this.isLoggedIn = true;
  }
}