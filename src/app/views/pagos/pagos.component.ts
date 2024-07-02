import { Component, ElementRef, ViewChild } from '@angular/core';
import { Stripe, StripeElementsOptions, StripeCardElement, StripeCardElementOptions } from '@stripe/stripe-js';
import { environment } from '../../../../environments/enviroment';
import { StripeService } from '../../stripe/stripe.component';
@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  stripe: Stripe | null = null;
  cardElement: StripeCardElement | null = null;
  @ViewChild('cardElement') cardElementRef!: ElementRef;

  constructor(private stripeService: StripeService) {
    this.setupStripe();
  }

  async setupStripe() {
    try {
      const stripe = await import('@stripe/stripe-js');
      this.stripe = await stripe.loadStripe(environment.stripePublicKey); 
      if (!this.stripe) {
        throw new Error('Error al cargar Stripe.');
      }
      
      const elements = this.stripe.elements({
        locale: 'es' 
      });

      this.cardElement = elements.create('card') as StripeCardElement;
      this.cardElement.mount(this.cardElementRef.nativeElement);
    } catch (error) {
      console.error('Error en la configuración de Stripe:', error);
    }
  }

  async onSubmit() {
    if (!this.stripe || !this.cardElement) {
      console.error('Stripe no está configurado aún.');
      return;
    }

    const { token, error } = await this.stripe.createToken(this.cardElement);

    if (error) {
      console.error('Error al crear token:', error);
    } else {
      console.log('Token creado:', token);
      this.procesarPago(token.id);
    }
  }

  procesarPago(tokenId: string) {
    console.log('Procesando pago con tokenId:', tokenId);

    this.stripeService.confirmPaymentIntent(tokenId)
      .subscribe(response => {
        console.log('Respuesta del backend:', response);
      }, error => {
        console.error('Error al confirmar el pago en el backend:', error);
      });
  }
}