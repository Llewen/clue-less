import {ServerUser} from './serverUser.class';
import {Room} from './room.class';
import {Card} from './card.class';
import {CaseFile} from '../../clue-less/src/app/Classes/caseFile.class';

export class Game{
    isStarted: boolean;
    players: Array<ServerUser>;

    caseFile: CaseFile;
    deckAvailableForPlayers: Array<Card>;

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

    rooms = ["Study", "Hall", "Lounge", "Library", "Billard Room", "Dining Room", "Conservatory", "Ball Room", "Kitchen"];
    characterNames = ['Miss Scarlet', 'Colonel Mustard','Mrs. White','Mr. Green','Mrs. Peacock','Professor Plum'];
    weapons = ['Rope','Lead Pipe','Knife','Wrench','Candlestick','Revolver'];

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

    initializeCardsAndCaseFile(){
        // create random card for case file
        var randRoomValue = this.rooms.splice(this.randomIntFromInterval(0,this.rooms.length-1),1)[0];
        var roomCard = new Card("Room", randRoomValue);
        var randWeaponValue = this.weapons.splice(this.randomIntFromInterval(0,this.weapons.length-1),1)[0];
        var weaponCard = new Card("Weapon", randWeaponValue );
        var randCharacterValue = this.characterNames.splice(this.randomIntFromInterval(0, this.characterNames.length-1),1)[0];
        var characterCard = new Card("Character", randCharacterValue);
        this.caseFile = new CaseFile(characterCard, weaponCard, roomCard);

        this.deckAvailableForPlayers = new Array<Card>();
        var self = this;
        // Create cards with the rest of the values
        this.rooms.forEach(function(roomName, index){
            self.deckAvailableForPlayers.push(new Card("room", roomName));
        })

        this.weapons.forEach(function(weaponName, index){
            self.deckAvailableForPlayers.push(new Card("weapon", weaponName));
        });
        this.characterNames.forEach(function(characterName, index){
            self.deckAvailableForPlayers.push(new Card("Character", characterName))
        })

        // Deal out the cards to the players
        while(this.deckAvailableForPlayers.length > 0){
            this.dealCards();
        }
    }


    randomIntFromInterval(min,max)
    {
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    
    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    dealCards(){
        var self = this;
        this.players.forEach(element => {
            if(self.deckAvailableForPlayers.length > 0){
                element.user.cards.push(this.deckAvailableForPlayers.pop());
            }
        });
    }
}