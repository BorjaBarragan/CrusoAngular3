import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  
  providedIn: 'root'  
})
export class SharingDataService {

  // Definimos un EventEmitter que emitirá un número (ID del producto).
  private _idProductEventEmitter: EventEmitter<number> = new EventEmitter();

  private _productEventEmmiter : EventEmitter<Product> = new EventEmitter();


  constructor() { }

  get productEventEmmiter(): EventEmitter <Product>{
    return this._productEventEmmiter;
  }
  // Creamos un getter para exponer el EventEmitter. Otros componentes accederán a esto
  // para suscribirse y escuchar los eventos que emite el servicio.
  get idProductEventEmitter() : EventEmitter <number>{
    return this._idProductEventEmitter;
  }
}
