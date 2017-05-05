"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_class_1 = require("./room.class");
const card_class_1 = require("./card.class");
const caseFile_class_1 = require("../../clue-less/src/app/Classes/caseFile.class");
class Game {
    constructor() {
        this.turnOrder = ["Miss Scarlet", "Colonel Mustard", "Mrs. White", "Mr. Green", "Mrs. Peacock", "Professor Plum"];
        this.turnIndex = -1;
        this.rooms = ["Study", "Hall", "Lounge", "Library", "Billard Room", "Dining Room", "Conservatory", "Ball Room", "Kitchen"];
        this.characterNames = ['Miss Scarlet', 'Colonel Mustard', 'Mrs. White', 'Mr. Green', 'Mrs. Peacock', 'Professor Plum'];
        this.weapons = ['Rope', 'Lead Pipe', 'Knife', 'Wrench', 'Candlestick', 'Revolver'];
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
    initializeCardsAndCaseFile() {
        // create random card for case file
        var randRoomValue = this.rooms.splice(this.randomIntFromInterval(0, this.rooms.length - 1), 1)[0];
        var roomCard = new card_class_1.Card("Room", randRoomValue);
        var randWeaponValue = this.weapons.splice(this.randomIntFromInterval(0, this.weapons.length - 1), 1)[0];
        var weaponCard = new card_class_1.Card("Weapon", randWeaponValue);
        var randCharacterValue = this.characterNames.splice(this.randomIntFromInterval(0, this.characterNames.length - 1), 1)[0];
        var characterCard = new card_class_1.Card("Character", randCharacterValue);
        this.caseFile = new caseFile_class_1.CaseFile(characterCard, weaponCard, roomCard);
        this.deckAvailableForPlayers = new Array();
        var self = this;
        // Create cards with the rest of the values
        this.rooms.forEach(function (roomName, index) {
            self.deckAvailableForPlayers.push(new card_class_1.Card("room", roomName));
        });
        this.weapons.forEach(function (weaponName, index) {
            self.deckAvailableForPlayers.push(new card_class_1.Card("weapon", weaponName));
        });
        this.characterNames.forEach(function (characterName, index) {
            self.deckAvailableForPlayers.push(new card_class_1.Card("Character", characterName));
        });
        // Deal out the cards to the players
        while (this.deckAvailableForPlayers.length > 0) {
            this.dealCards();
        }
    }
    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    dealCards() {
        var self = this;
        this.players.forEach(element => {
            if (self.deckAvailableForPlayers.length > 0) {
                element.user.cards.push(this.deckAvailableForPlayers.pop());
            }
        });
    }
}
exports.Game = Game;
//# sourceMappingURL=game.class.js.map