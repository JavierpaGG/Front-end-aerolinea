import { Component, ElementRef, ViewChild } from '@angular/core';
import { Stripe, StripeElementsOptions, StripeCardElement, StripeCardElementOptions } from '@stripe/stripe-js';
import { environment } from '../../../../environments/enviroment';// Importa el entorno
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
      this.stripe = await stripe.loadStripe(environment.stripePublicKey); // Ajusta según tu configuración de entorno
      if (!this.stripe) {
        throw new Error('Error al cargar Stripe.');
      }
      
      const elements = this.stripe.elements({
        locale: 'es' // Define el idioma de los elementos de Stripe (opcional)
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
      // Envía el token al backend para confirmar el pago
      this.procesarPago(token.id);
    }
  }

  procesarPago(tokenId: string) {
    console.log('Procesando pago con tokenId:', tokenId);

    // Llama al método de confirmación del servicio StripeService
    this.stripeService.confirmPaymentIntent(tokenId)
      .subscribe(response => {
        console.log('Respuesta del backend:', response);
        // Aquí puedes manejar la respuesta del backend, por ejemplo, mostrar un mensaje de éxito
      }, error => {
        console.error('Error al confirmar el pago en el backend:', error);
        // Aquí puedes manejar los errores, por ejemplo, mostrar un mensaje de error al usuario
      });
  }
}