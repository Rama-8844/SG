import { PipeTransform,Pipe} from "@angular/core";
import { Card } from "../models/card.model";
import { pipe } from "rxjs";

@Pipe({
    name:'cardFilter',
    pure:false
})
export class CardFilterPipe implements PipeTransform{
    private counter=0;
    transform(cards:Card[], SearchTerm: String): Card[]{
        this.counter++;
        console.log('Filter pipe executed count' + this.counter);
          if(!cards|| !SearchTerm)
          {
              return cards;
          }

          return cards.filter(card=>
            card.Item_Name.toLowerCase().indexOf(SearchTerm.toLowerCase())!==-1);
    }
}