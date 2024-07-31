import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { Card, CardCreation } from '../../models/card.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private baseUrl = `${environment.api}/card`;

  constructor(private httpClient: HttpClient){
  }

  getCard(id?: string): Observable<Card[]> {
    const url = id ? `${this.baseUrl}?userId=${id}` : this.baseUrl;
    return this.httpClient.get<Card[]>(url);
  }


  updateCard(id: string, status: boolean): Observable<Card> {
    const url = `${this.baseUrl}/${id}?status=${status}`;
    return this.httpClient.patch<Card>(url, { status });
  }

  createCard(cardCreation: CardCreation, userId: string): Observable<Card> {
    const url = `${this.baseUrl}/user/${userId}`;
    return this.httpClient.post<Card>(url, cardCreation);
  }

  deleteCard(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
