// payment-intent.dto.ts

export enum Currency {
  USD = 'USD',
  PEN = 'PEN'
}

export interface PaymentIntentDTO {
  description: string;
  amount: number;
  currency: Currency;
  boletoId?: number;
}
export interface BoletoDto {
  id: number;
  precioFinal: number;
}