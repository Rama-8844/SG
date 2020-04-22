import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Card } from "../models/card.model";
import { Observable } from "rxjs";
import { CardService } from "./card.service";
import { Injectable } from "@angular/core";
import { map,catchError} from 'rxjs/operators';
// import { ResolvedCardList } from "./resolved-card-list.model";
@Injectable()
export class CardListResolverService implements Resolve<Card[] | string>{
    constructor(private _CardService: CardService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Card[] | string> {
       return this._CardService.getCards()
       .pipe(
          catchError((err : string)=>Observable.of(err))
          );
    }

}