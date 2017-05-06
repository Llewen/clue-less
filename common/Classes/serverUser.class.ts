import { Player } from './player.class';

export class ServerUser {
    serverId;
    user: Player;
    ActivePlayer:Boolean;

    constructor(serverId, user: Player)
    {
        this.serverId = serverId;
        this.user = user;
        this.ActivePlayer = true;
    }
}