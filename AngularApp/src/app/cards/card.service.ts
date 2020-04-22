import { Injectable } from "@angular/core";
import { Card } from "../models/card.model";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from "rxjs";
@Injectable()
export class CardService {
  constructor(private httpClient: HttpClient) {

  }
 

  baseUrl = 'https://localhost:44354/api/values';
  getCards(): Observable<Card[]> {
    //return Observable.of(this.listCards).delay(2000);
    return this.httpClient.get<Card[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error', errorResponse.error);
    }
    else {
      console.error('Server Side Error', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later');

  }
  getCard(id: number): Observable<Card> {
    return this.httpClient.get<Card>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
  addCard(Card: Card): Observable<Card> {
    //if (Card.id == null) {
      // const maxid = this.listCards.reduce(function (e1, e2) {
      //   return e1.id > e2.id ? e1 : e2;
      // }).id;
      // Card.id = maxid + 1;
      //this.listCards.push(Card);
    //   return this.httpClient.post<Card>(this.baseUrl, Card, {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json'
    //     })
    //   }).pipe(catchError(this.handleError));
    // }
    // else {
    //   const foundIndex = this.listCards.findIndex(e => e.id == Card.id);
    //   this.listCards[foundIndex] = Card;
    // }
    return this.httpClient.post<Card>(this.baseUrl, Card, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));
  }
  updateCard(Card: Card): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/${Card.Item_ID}`, Card, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError));

  }
  deleteCard(id: number) : Observable<void>{
    // const i = this.listCards.findIndex(e => e.id == id);
    // if (i !== -1) {
    //   this.listCards.splice(i, 1);
    // }
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
    .pipe(catchError(this.handleError));
  }
}