import { Card } from "../../../../common/Classes/card.class";

export class CaseFile{
    who: Card;
    what: Card;
    where: Card;

    constructur(inputWho: Card, inputWhat: Card, inputWhere: Card){
        this.who = inputWho;
        this.what = inputWhat;
        this.where = inputWhere;
    }

    getWho(): Card{
        return this.who;
    }

    getWhat(): Card{
        return this.what;
    }

    getWhere(): Card{
        return this.where;
    }

    getWhoWhatWhere(): [Card, Card, Card]{
        return [this.getWho(), this.getWhat(), this.getWhere()];
    }
}