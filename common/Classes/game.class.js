"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_class_1 = require("./room.class");
class Game {
    constructor() {
        this.turnOrder = ["Miss Scarlet", "Colonel Mustard", "Mrs. White", "Mr. Green", "Mrs. Peacock", "Professor Plum"];
        this.turnIndex = -1;
        //set the rooms
        this.Study = new room_class_1.Room("Study", 6, ["Kitchen", "Hallway1", "Hallway3"]);
        this.Hallway1 = new room_class_1.Room("Hallway1", 1, ["Study", "Hall"]);
        this.Hall = new room_class_1.Room("Hall", 6, ["Hallway1", "Hallway2", "Hallway4"]);
        this.Hallway2 = new room_class_1.Room("Hallway2", 1, ["Hall", "Lounge"]);
        this.Lounge = new room_class_1.Room("Lounge", 6, ["Conservatory", "Hallway2", "Hallway5"]);
        this.Hallway3 = new room_class_1.Room("Hallway3", 1, ["Study", "Library"]);
        this.Hallway4 = new room_class_1.Room("Hallway4", 1, ["Hall", "Billiard Room"]);
        this.Hallway5 = new room_class_1.Room("Hallway5", 1, ["Lounge", "Dining Room"]);
        this.Library = new room_class_1.Room("Library", 6, ["Hallway3", "Hallway6", "Hallway8"]);
        this.Hallway6 = new room_class_1.Room("Hallway6", 1, ["Library", "Billiard Room"]);
        this.BilliardRoom = new room_class_1.Room("Billiard Room", 6, ["Hallway6", "Hallway4", "Hallway7", "Hallway9"]);
        this.Hallway7 = new room_class_1.Room("Hallway7", 1, ["Billiard Room", "Dining Room"]);
        this.DiningRoom = new room_class_1.Room("Dining Room", 6, ["Hallway7", "Hallway5", "Hallway10"]);
        this.Hallway8 = new room_class_1.Room("Hallway8", 1, ["Library", "Conservatory"]);
        this.Hallway9 = new room_class_1.Room("Hallway9", 1, ["Billiard Room", "Ball Room"]);
        this.Hallway10 = new room_class_1.Room("Hallway10", 1, ["Dining Room", "Kitchen"]);
        this.Conservatory = new room_class_1.Room("Conservatory", 6, ["Hallway8", "Hallway11", "Lounge"]);
        this.Hallway11 = new room_class_1.Room("Hallway11", 1, ["Conservatory", "Ball Room"]);
        this.BallRoom = new room_class_1.Room("Ball Room", 6, ["Hallway11", "Hallway9", "Hallway12"]);
        this.Hallway12 = new room_class_1.Room("Hallway12", 1, ["Ball Room", "Kitchen"]);
        this.Kitchen = new room_class_1.Room("Kitchen", 6, ["Hallway12", "Hallway10", "Study"]);
    }
}
exports.Game = Game;
//# sourceMappingURL=game.class.js.map