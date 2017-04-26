//this class is the gameObject that will be passed back and forth between client.  It should not contain any logic.

import {Board} from "./board.class";
import {GameCharacter} from "./gameCharacter.class";
//import rest of classes here

export class Game{
    userName: string;
    selectedCharacter: GameCharacter;    

    constructor(){
        //not needed but included to show you can specify a constructor for a class. overloading is now allowed.
    }
}