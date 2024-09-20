import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { products } from '../data/product.data';

@Injectable({
  providedIn: 'root'
  // Hace que el servicio esté disponible a nivel raíz para toda la aplicación
})
export class ProductService {

  constructor() {
    // Constructor vacío porque no necesitamos inyectar ninguna dependencia en este servicio
  }

  findAll(): Product[] {
    // Método que devuelve todos los productos
    return products;
    //Devuelve un array de productos (desde una fuente de datos)
  }
}
