import { Card } from '../../../../common/Classes/card.class';

export class SuggestionReply
{
    canDisprove: boolean;
    card: Card;

    constructor(canDisprove?: boolean, card?: Card)
    {
        this.canDisprove = canDisprove;
        if(card)
        {
            this.card = card;
        }
    }
}