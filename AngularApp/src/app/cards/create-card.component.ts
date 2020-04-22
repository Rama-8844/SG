import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../models/department.model';
// Import BsDatepickerConfig type. This is the Config object for datepicker. Using this
// config object we can set minDate, maxDate, whether to show/hide week numbers and
// change the color theme using the containerClass property.
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Card } from '../models/card.model';
import { CardService } from './card.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.css']
})
export class CreateCardComponent implements OnInit {
  panelTitle: string;
  @ViewChild('cardForm') public CreateCardForm: NgForm;
  previewPhoto = false;
  // create a property of type Partial<BsDatepickerConfig>
  datePickerConfig: Partial<BsDatepickerConfig>;
  card: Card = {
    Item_ID: null,
    Item_Name: null,
    Description: null,
    Price: null
  };
  departments: Department[] = [
    { id: 1, name: "Help Desk" },
    { id: 2, name: "HR" },
    { id: 3, name: "IT" },
    { id: 4, name: "Payroll" },
    { id: 5, name: "Admin" }
  ]
  //dateOfBirth: Date=new Date(2020,0,1);
  //gender="male"
  isActive = true
  //department='3'
  constructor(private _cardService: CardService,
    private _router: Router,
    private _route: ActivatedRoute) {
    this.datePickerConfig = Object.assign({},
      {
        containerClass: 'theme-dark-blue',
        // showWeekNumbers: false,
        // minDate: new Date(2020,0,1),
        // maxDate: new Date(2020,11,31),
        dateInputFormat: "DD/MM/YYYY"
      });
  }
  togglePhotoPreview() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {
    this._route.paramMap.subscribe(parameterMap => {
      const id = +parameterMap.get('id');
      this.getCard(id);
    })
  }
  private getCard(id: number) {
    if (id == 0) {
      this.card == {
        Item_ID: null,
        Item_Name: null,
        Description: null,
        Price: null
      };
      this.panelTitle = 'Create Card';
      this.CreateCardForm.reset();
    }
    else {
      this.panelTitle = 'Edit Card';
      this._cardService.getCard(id).subscribe(
        (card) => this.card = card,
        (err: any) => console.log(err)
      );
    }
  }
  saveCard(): void {
    //console.log(newCard);
    //const newCard: Card = Object.assign({}, this.card);
    if (this.card.Item_ID == null) {
      this._cardService.addCard(this.card).subscribe(
        (data: Card) => {
          console.log(data);
          this.CreateCardForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
    else {
      this._cardService.updateCard(this.card).subscribe(
        () => {
          this.CreateCardForm.reset();
          this._router.navigate(['list']);
        },
        (error: any) => console.log(error)
      );
    }
  }
}
