import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Card } from '../models/card.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../cards/card.service';

@Component({
  selector: 'app-display-card',
  templateUrl: './display-card.component.html',
  styleUrls: ['./display-card.component.css']
})
export class DisplayCardComponent implements OnInit {

  @Input() card: Card;
  @Input() SearchTerm: string;
  @Output() notifyDelete: EventEmitter<number> = new EventEmitter<number>();
  confirmDelete = false;
  private selectedCardId: number;

  constructor(private _route: ActivatedRoute,
    private _router: Router,
    private _cardService: CardService) { }

  ngOnInit() {
    this.selectedCardId = +this._route.snapshot.paramMap.get('id');
  }

  editCard(cardId: number) {
    this._router.navigate(['/edit', this.card.Item_ID]);
  }
  deleteCard() {
    this._cardService.deleteCard(this.card.Item_ID).subscribe(
      () => console.log(`Card with Id=${this.card.Item_ID} deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.card.Item_ID);
  }
}
