import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Import RouterModule
import { RouterModule,Routes  } from '@angular/router';
import { FormsModule  } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ListCardsComponent } from './cards/list-cards.component';
import { CreateCardComponent } from './cards/create-card.component';
import {SelectRequiredValidatorDirective} from './shared/select-required-validator.directive';
import {ConfirmEqualValidatorDirective} from './shared/confirm-equal-validator.directive';
import {CardService} from './cards/card.service';
import { DisplayCardComponent } from './card/display-card.component';
import {CreateCardCanDeactivateGuardService} from './cards/create-card-can-deactivate-guard.service';
import { CardDetailsComponent } from './cards/card-details.component';
import { CardFilterPipe } from './cards/card-filter.pipe';
import { CardListResolverService } from './cards/card-list-resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { CardDetailsGuardService } from './cards/card-details-guard.service';
import { AccordionComponent } from './shared/accordion.component';
import {HttpClientModule} from '@angular/common/http';
// Each route maps a URL path to a component
// The 3rd route specifies the route to redirect to if the path
// is empty. In our case we are redirecting to /list
// pathMatch property value can be full or prefix. For now we
// will set it to full as we want to do a full match. In our upcoming videos,
// we will discuss the difference between prefix and full in detail.
const appRoutes: Routes = [
  { path: 'list', 
    component: ListCardsComponent,
    resolve:{ cardList: CardListResolverService}
   },
  { 
    path: 'edit/:id',
    component: CreateCardComponent,
    canDeactivate:[CreateCardCanDeactivateGuardService]
  },
  { path: 'cards/:id', component: CardDetailsComponent,
     canActivate: [CardDetailsGuardService] },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notfound', component: PageNotFoundComponent },

];

// To let the router know about the routes configured above,
// pass "appRoutes" constant to forRoot(appRoutes) method
// We also have forChild() method. We will discuss the difference
// and when to use one over the other in our upcoming videos

@NgModule({
  declarations: [
    AppComponent,
    ListCardsComponent,
    CreateCardComponent,
    SelectRequiredValidatorDirective,
    ConfirmEqualValidatorDirective,
    DisplayCardComponent,
    CardDetailsComponent,
    CardFilterPipe,
    PageNotFoundComponent,
    AccordionComponent
  ],
  imports: [
    BrowserModule,
   // BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CardService,CreateCardCanDeactivateGuardService,CardListResolverService,
    CardDetailsGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
