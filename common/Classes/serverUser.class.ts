import { Player } from './player.class';

export class ServerUser {
    serverId;
    user: Player;

    constructor(serverId, user: Player)
    {
        this.serverId = serverId;
        this.user = user;
    }
}