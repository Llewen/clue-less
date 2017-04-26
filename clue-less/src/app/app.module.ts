//angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//other vendors
import {SelectButtonModule} from 'primeng/primeng';

//custom components
import { AppComponent } from './Components/app.component/app.component';
import { ChatComponent } from './Components/chat.component/chat.component';
import { GameComponent } from './Components/game.component/game.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    GameComponent //this lets the app know how to inject the chat component anywhere were <chat></chat> is in a template
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SelectButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
