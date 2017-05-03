import { Game } from "./game.class";

export class Player {
    userName: string;
    game: Game;

    constructor(userName: string)
    {
        this.userName = userName;
    }
}