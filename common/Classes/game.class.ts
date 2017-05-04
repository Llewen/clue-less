import {ServerUser} from './serverUser.class';
import {Room} from './room.class';

export class Game{
    isStarted: boolean;
    players: Array<ServerUser>;

    //all the rooms
    Study: Room;
    Hallway1: Room;
    Hall: Room;
    Hallway2: Room;
    Lounge: Room;
    Hallway3: Room;
    Hallway4: Room;
    Hallway5: Room;
    Library: Room;
    Hallway6: Room;
    BilliardRoom: Room;
    Hallway7: Room;
    DiningRoom: Room;
    Hallway8: Room;
    Hallway9: Room;
    Hallway10: Room;
    Conservatory: Room;
    Hallway11: Room;
    BallRoom: Room;
    Hallway12: Room;
    Kitchen: Room;   
    
    
    turnOrder =  ["Miss Scarlet", "Colonel Mustard", "Mrs. White", "Mr. Green", "Mrs. Peacock", "Professor Plum"];
    turnIndex = -1;

    constructor(){
        //set the rooms
        this.Study = new Room("Study");
        this.Hallway1 = new Room("Hallway1", 1);
        this.Hall = new Room("Hall");
        this.Hallway2 = new Room("Hallway2", 1);
        this.Lounge = new Room("Lounge");
        this.Hallway3 = new Room("Hallway3", 1);
        this.Hallway4 = new Room("Hallway4", 1);
        this.Hallway5 = new Room("Hallway5", 1);
        this.Library = new Room("Library");
        this.Hallway6 = new Room("Hallway6", 1);
        this.BilliardRoom = new Room("Billiard Room");
        this.Hallway7 = new Room("Hallway7", 1);
        this.DiningRoom = new Room("Dining Room");
        this.Hallway8 = new Room("Hallway8", 1);
        this.Hallway9 = new Room("Hallway9", 1);
        this.Hallway10 = new Room("Hallway10", 1);
        this.Conservatory = new Room("Conservatory");
        this.Hallway11 = new Room("Hallway11", 1);
        this.BallRoom = new Room("Ball Room");
        this.Hallway12 = new Room("Hallway12", 1);
        this.Kitchen = new Room("Kitchen");
    }
}