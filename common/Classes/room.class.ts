import { ServerUser } from './serverUser.class';

export class Room{
    name: string;
    players: Array<ServerUser>;
    capacity: number;

    constructor(name: string, capacity?: number)
    {
        this.name = name;
        if(capacity)
        {
            this.capacity = capacity;
        }
        else{
            this.capacity = 6;
        }

        this.players = new Array<ServerUser>();
    }

}