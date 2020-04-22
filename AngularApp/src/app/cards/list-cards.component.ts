import { Component, OnInit } from '@angular/core';
// import Card Model
import { Card } from '../models/card.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ResolvedCardList } from './resolved-card-list.model';
import { CardService } from './card.service';
@Component({
  selector: 'app-list-cards',
  templateUrl: './list-cards.component.html',
  styleUrls: ['./list-cards.component.css']
})
export class ListCardsComponent implements OnInit {
  // Hard code the card data. In a later video we will discuss
  // how to retrieve this cards data from a database table
  cards: Card[];
  filteredCards: Card[];
  private _searchTerm: string;
  //dataFromChild: Card;
  //cardToDisplay: Card;
  private arrayIndex = 1;
  error : string;

  get SearchTerm(): string {
    return this._searchTerm;
  }
  set SearchTerm(value: string) {
    this._searchTerm = value;
    this.filteredCards = this.filterCards(value);
  }
  constructor(private _router: Router, private _route: ActivatedRoute,private cardService:CardService) {
    //this.cards = this._route.snapshot.data["cardList"];
    const resolvedData: Card[] | string =this._route.snapshot.data["cardList"];
if(Array.isArray(resolvedData)){
  this.cards= resolvedData;
}
else{
  this.error= resolvedData;
}
    if (this._route.snapshot.queryParamMap.has('SearchTerm')) {
      this.SearchTerm = this._route.snapshot.queryParamMap.get('SearchTerm');
    }
    else {
      this.filteredCards = this.cards;

    }
  }

  ngOnInit() {
    // this.cardService.getCards().subscribe((cardList)=>{
    //   this.cards=cardList;   

    //  });
    //this.cardToDisplay=this.cards[0];

  }
  // changeCardName() {
  //   this.cards[0].name = "Jordan";
  //   this.filteredCards = this.filtercards(this.SearchTerm);
  //   //  const newCardArray : Card[] = Object.assign([], this.cards);
  //   //  newCardArray[0].name="Jordan";
  //   //  this.cards=newCardArray;
  // }
  filterCards(searchstring: string) {
    return this.cards.filter(card =>
      card.Item_Name.toLowerCase().indexOf(searchstring.toLowerCase()) !== -1);
  }
  OnDeleteNotification(id : number){
    const i =this.filteredCards.findIndex(e=>e.Item_ID==id);
    if(i!==-1){
      this.filteredCards.splice(i,1);
    }
  }
}
  