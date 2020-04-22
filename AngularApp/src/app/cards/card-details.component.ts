import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from './card.service';
import { Card } from '../models/card.model';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-Card-details',
  templateUrl: './Card-details.component.html',
  styleUrls: ['./Card-details.component.css']
})
export class CardDetailsComponent implements OnInit {
  private _id: number;
  Card: Card;
  constructor(private _route: ActivatedRoute,
    private _CardService: CardService,
    private _router: Router) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this._id = + params.get('id');
      this._CardService.getCard(this._id).subscribe(
        (emp)=>this.Card=emp,
        (error:any)=>console.log(error)
      );
    });
  }
  viewNextCard() {
    if(this._id<3){
      this._id = this._id + 1;
    }
    else{
      this._id=1;
    }
    this._router.navigate(['/Cards', this._id],{
      queryParamsHandling: 'preserve'
    });
  }
}
