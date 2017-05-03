import {ServerUser} from './serverUser.class';

export class Game{
    isStarted: boolean;
    players: Array<ServerUser>;
    turnOrder =  ["Miss Scarlet", "Colonel Mustard", "Mrs. White", "Mr. Green", "Ms. Peacock", "Professor Plum"];
    turnIndex = -1;

    constructor(){
        //not needed but included to show you can specify a constructor for a class. overloading is now allowed.
    }
}