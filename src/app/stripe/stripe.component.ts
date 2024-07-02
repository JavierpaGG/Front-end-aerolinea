import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  private baseUrl = 'http://localhost:8090/api/pagos/stripe';

  constructor(private http: HttpClient) { }

  createPaymentIntent(paymentIntentDTO: any) {
    return this.http.post<any>(`${this.baseUrl}/paymentintent`, paymentIntentDTO);
  }

  confirmPaymentIntent(id: string) {
    return this.http.post<any>(`${this.baseUrl}/confirm/${id}`, {});
  }

  cancelPaymentIntent(id: string) {
    return this.http.post<any>(`${this.baseUrl}/cancel/${id}`, {});
  }
}