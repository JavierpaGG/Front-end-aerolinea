import { Injectable } from '@angular/core';
import axios, { AxiosInstance } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://192.168.1.10:8090/api/',
      timeout: 1000,
      headers: {'Content-Type': 'application/json'}
    });
  }

  get(endpoint: string) {
    return this.axiosInstance.get(endpoint)
      .then(response => response.data)
      .catch(error => {
        console.error('There was an error!', error);
        throw error;
      });
  }

  post(endpoint: string, data: any) {
    return this.axiosInstance.post(endpoint, data)
      .then(response => response.data)
      .catch(error => {
        console.error('There was an error!', error);
        throw error;
      });
  }
  delete(endpoint: string) {
  console.log('Enviando solicitud de eliminación a:', endpoint);
  return this.axiosInstance.delete(endpoint)
    .then(response => {
      console.log('Respuesta recibida:', response);
      return response.data;
    })
    .catch(error => {
      console.error('¡Hubo un error!', error);
      throw error;
    });
}


  put(endpoint: string, data: any) {
    return this.axiosInstance.put(endpoint, data)
      .then(response => response.data)
      .catch(error => {
        console.error('¡Hubo un error!', error);
        throw error;
      });
  }
  searchHotels(query: string) {
    return this.get(`hoteles/listar?query=${query}`);
  }
}

