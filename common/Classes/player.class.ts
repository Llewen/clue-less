import { Card } from './card.class';

export class Player {
    userName: string;
    character: string;
    color: string;
    isTurn: boolean;
    cards: Array<Card>;

    constructor(userName: string, color: string)
    {
        this.userName = userName;
        this.color = color;
        this.cards = new Array<Card>();
    }
}