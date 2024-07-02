import { Hotel } from "./hotel.model";
export interface Habitacion {
    id:                 number;
    estado:             boolean;
    tipo_habitacion:     string;
    hotel:              Hotel; 
    cantidad_camas:      number;
    cantidad_personas:   number;
    precio:             number;
    imagen:             string;
  }