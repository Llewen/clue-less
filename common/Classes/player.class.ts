import { Game } from "../../clue-less/src/app/Classes/game.class";

export class Player {
    userName: string;
    game: Game;

    constructor(userName: string)
    {
        this.userName = userName;
    }
}