import { ServerUser } from './serverUser.class';


export class Lobby {
    name: string;
    host: ServerUser;
    players: Array<ServerUser>;

    constructor(lobbyName: string, host: ServerUser){
        this.name = lobbyName;
        this.host = host;
        this.players = new Array<ServerUser>();
    }
}