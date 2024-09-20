import { Component } from '@angular/core';
import { CartItem } from '../../models/cartItem'; 
import { Router } from '@angular/router'; 
import { SharingDataService } from '../../services/sharing-data.service';

@Component({
  selector: 'cart',
  standalone: true,  // Este componente es independiente y no necesita módulos adicionales.
  templateUrl: './cart.component.html',  // El template HTML que renderiza el carrito
})
export class CartComponent {

  items: CartItem[] = [];  // Arreglo de items en el carrito
  total = 0;  // Total del precio de los productos en el carrito

  // El constructor inyecta el servicio `SharingDataService` y el `Router` de Angular
  constructor(private sharingDataService: SharingDataService, private router: Router) {
    
    // Obtenemos los items del carrito y el total de la navegación actual usando `Router`.
    this.items = this.router.getCurrentNavigation()?.extras.state!['items'];
    this.total = this.router.getCurrentNavigation()?.extras.state!['total'];
  }
  
  // Este método se llama cuando el usuario hace clic en eliminar un producto del carrito.
  onDeleteCart(id: number) {
    // Emitimos un evento con el ID del producto que se quiere eliminar.
    // Cualquier componente suscrito a este emisor de eventos recibirá el ID.
    this.sharingDataService.idProductEventEmitter.emit(id);
  }
}
