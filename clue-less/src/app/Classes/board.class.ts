import {GameCharacter} from "./gameCharacter.class";
import {Room} from "../../../../common/Classes/room.class";
import {Hallway} from "./hallway.class";
import {Position} from "./position.class";

export class Board
{
    characters: Array<GameCharacter>;
    rooms: Array<Room>;
    hallways: Array<Hallway>;

    checkIfLegalMove(characterToMove: GameCharacter, moveHere: Position)
    {
        //implement here
        /*might be harder to have hallway and room be separate, instead of
        just having property that says what type it is*/
    }
}