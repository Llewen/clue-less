import { ServerUser } from './serverUser.class';
import { Game } from './game.class';


export class Lobby {
    name: string;
    host: ServerUser;
    players: Array<ServerUser>;
    game: Game;

    constructor(lobbyName: string, host: ServerUser){
        this.name = lobbyName;
        this.host = host;
        this.players = new Array<ServerUser>();
        this.game = new Game();
    }
}