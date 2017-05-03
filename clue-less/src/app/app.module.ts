//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//other vendors
import {SelectButtonModule, DialogModule, DataTableModule,SharedModule} from 'primeng/primeng';

//custom components
import { AppComponent } from './Components/app/app.component';
import { ChatComponent } from './Components/chat/chat.component';
import { GameComponent } from './Components/game/game.component';
import { CardsComponent } from './Components/cards/cards.component';
import { NavComponent } from './Components/nav/nav.component';
import { UserLoginComponent } from './Components/userLogin/userLogin.component';
import { LobbyComponent } from './Components/lobby/lobby.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    GameComponent,
    CardsComponent,
    NavComponent,
    LobbyComponent,
    UserLoginComponent //this lets the app know how to inject the chat component anywhere were <chat></chat> is in a template
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SelectButtonModule,
    BrowserAnimationsModule,
    DataTableModule,
    SharedModule,
    DialogModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
