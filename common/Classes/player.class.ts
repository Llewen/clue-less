export class Player {
    userName: string;
    character: string;
    color: string;
    isTurn: boolean;

    constructor(userName: string, color: string)
    {
        this.userName = userName;
        this.color = color;
    }
}