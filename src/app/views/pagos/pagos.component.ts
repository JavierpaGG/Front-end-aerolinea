import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Stripe, StripeCardElement } from '@stripe/stripe-js';
import { environment } from '../../../../environments/enviroment';
import { StripeService } from '../../controllers/stripe.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Boleto, DetalleBoleto } from '../../models/boleto.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.css']
})
export class PagosComponent {
  stripe: Stripe | null = null;
  cardElement: StripeCardElement | null = null;
  @ViewChild('cardElement') cardElementRef!: ElementRef;
  boletoId: number;
  boleto: Boleto | null = null;
  mostrarDetalle: boolean = false;
  mostrarDetalleAdicional: boolean = false;

  constructor(
    private stripeService: StripeService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.boletoId = +this.route.snapshot.paramMap.get('idBoleto')!;
  }
  

  ngOnInit() {
    this.getBoletoDetails(this.boletoId);
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
    }
  }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.stripe || !this.cardElement) {
      return;
    }

    const { error, token } = await this.stripe.createToken(this.cardElement);

    if (error) {
    } else {
      const paymentIntentDTO = {
        description: "Compra de boleto de avión",
        currency: "PEN",
        boletoId: this.boletoId,
        paymentMethodData: {
          type: "card",
          token: token.id
        }
      };

      this.stripeService.createPaymentIntent(paymentIntentDTO).subscribe(response => {
        this.confirmPayment(response.client_secret, response.id);
      }, error => {
      });
    }
  }

  confirmPayment(clientSecret: string, paymentIntentId: string) {
    Swal.fire({
      title: 'Confirmar Pago',
      text: "¿Deseas confirmar el pago?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.stripeService.confirmPaymentIntent(paymentIntentId).subscribe(response => {
          Swal.fire('¡Pago confirmado!', 'Tu pago ha sido procesado con éxito.', 'success').then(() => {
            this.router.navigate(['/main'], { replaceUrl: true });
          });
        }, error => {
          Swal.fire('Error', 'Hubo un error al confirmar tu pago.', 'error');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.stripeService.cancelPaymentIntent(paymentIntentId).subscribe(response => {
          Swal.fire('Pago cancelado', 'Tu pago ha sido cancelado.', 'info');
        }, error => {
          Swal.fire('Error', 'Hubo un error al cancelar tu pago.', 'error');
        });
      }
    });
  }
  
  getBoletoDetails(id: number) {
    this.http.get<Boleto>(`http://localhost:8090/api/boletos/boleto/listar/${id}`).subscribe(
      (response) => {
        this.boleto = response;
      },
      (error) => {
      }
    );
  }

  toggleDetalle() {
    this.mostrarDetalle = !this.mostrarDetalle;
  }

  toggleDetalleAdicional() {
    this.mostrarDetalleAdicional = !this.mostrarDetalleAdicional;
  }
}