import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { CardService } from "./card.service";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
@Injectable()
export class CardDetailsGuardService implements CanActivate{
    constructor(private _CardService : CardService,
        private _route: Router){
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
       return this._CardService.getCard(+route.paramMap.get('id')).pipe(
            map(Card=>{
                const CardExists=!!Card
                if(CardExists){
                    return true;
                }
                else{
                    this._route.navigate(['notfound']);
                    return false;
                }
            }),
            catchError(err=>{
                console.log(err);
                return Observable.of(false);
            })
        );
            
    }

}