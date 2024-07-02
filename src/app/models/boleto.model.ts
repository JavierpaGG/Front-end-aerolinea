export interface Boleto {
    id: number;
    numeroBoleto: string;
    fechaEmision: Date;
    usuarioId: number;
    precioFinal: number;
    estado: string;
    metodoPago: string;
    esIdaYVuelta: boolean;
    idVuelo: number;
    detallesBoleto: DetalleBoleto[];
  }
  
  export interface DetalleBoleto {
    id: number;
    nombreCompleto: string;
    dni: string;
    asiento: string;
    categoriaViaje: string; // ECONOMICO, EJECUTIVO, PRIMERA_CLASE
    esIda: boolean;
    precioUnitario: number;
  }
  