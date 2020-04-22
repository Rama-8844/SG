import {CanDeactivate} from '@angular/router';
import { CreateCardComponent } from "./create-card.component";
import { Injectable } from '@angular/core';

@Injectable()
export class CreateCardCanDeactivateGuardService implements CanDeactivate<CreateCardComponent>{
    canDeactivate(component: CreateCardComponent): boolean{
        if(component.CreateCardForm.dirty){
          return  confirm('Are you sure you want to discard your changes?');
        }
        return true;
    }
}