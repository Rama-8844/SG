import { Card } from "../models/card.model";

export class ResolvedCardList{
    constructor(public cardList: Card[], public error : any = null){}
}