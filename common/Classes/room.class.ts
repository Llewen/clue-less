import { ServerUser } from './serverUser.class';

export class Room{
    name: string;
    players: Array<ServerUser>;
    capacity: number;
    neighbors: Array<string>;

    constructor(name: string, capacity?: number, neighbors?: Array<string>)
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
        if(neighbors)
        {
            this.neighbors = neighbors;
        }
    }

}