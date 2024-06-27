import { Hotel } from "./hotel.model";
export interface Habitacion {
    id:                 number;
    estado:             boolean;
    tipoHabitacion:     string;
    hotel:              Hotel; 
    cantidadCamas:      number;
    cantidadPersonas:   number;
    precio:             number;
    imagen:             string;
  }