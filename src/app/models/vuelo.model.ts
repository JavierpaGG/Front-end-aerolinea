export interface Vuelo {
    id:                    number;
    numeroVuelo:           string;
    aeropuertoOrigenId:    number;
    aeropuertoLlegadaId:   number;
    fechaSalida:           Date;
    horaSalida:            string;
    horaLlegada:           string;
    duracion:              number;
    asientosDisponibles:   number;
    estado:                string;
    precio:                number;
}
