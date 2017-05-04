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
        this.Study = new Room("Study", 6, ["Kitchen", "Hallway1", "Hallway3"]);
        this.Hallway1 = new Room("Hallway1", 1, ["Study", "Hall"]);
        this.Hall = new Room("Hall", 6, ["Hallway1", "Hallway2", "Hallway4"]);
        this.Hallway2 = new Room("Hallway2", 1, ["Hall", "Lounge"]);
        this.Lounge = new Room("Lounge", 6, ["Conservatory", "Hallway2", "Hallway5"]);
        this.Hallway3 = new Room("Hallway3", 1, ["Study", "Library"]);
        this.Hallway4 = new Room("Hallway4", 1, ["Hall", "Billiard Room"]);
        this.Hallway5 = new Room("Hallway5", 1, ["Lounge", "Dining Room"]);
        this.Library = new Room("Library", 6, ["Hallway3", "Hallway6", "Hallway8"]);
        this.Hallway6 = new Room("Hallway6", 1, ["Library", "Billiard Room"]);
        this.BilliardRoom = new Room("Billiard Room", 6, ["Hallway6", "Hallway4", "Hallway7", "Hallway9"]);
        this.Hallway7 = new Room("Hallway7", 1, ["Billiard Room", "Dining Room"]);
        this.DiningRoom = new Room("Dining Room", 6, ["Hallway7", "Hallway5", "Hallway10"]);
        this.Hallway8 = new Room("Hallway8", 1, ["Library", "Conservatory"]);
        this.Hallway9 = new Room("Hallway9", 1, ["Billiard Room", "Ball Room"]);
        this.Hallway10 = new Room("Hallway10", 1, ["Dining Room", "Kitchen"]);
        this.Conservatory = new Room("Conservatory", 6, ["Hallway8", "Hallway11", "Lounge"]);
        this.Hallway11 = new Room("Hallway11", 1, ["Conservatory", "Ball Room"]);
        this.BallRoom = new Room("Ball Room", 6, ["Hallway11", "Hallway9", "Hallway12"]);
        this.Hallway12 = new Room("Hallway12", 1, ["Ball Room", "Kitchen"]);
        this.Kitchen = new Room("Kitchen", 6, ["Hallway12", "Hallway10", "Study"]);
    }
}