<<<<<<< HEAD
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
=======
import { Component, EventEmitter, Input, Output } from '@angular/core';
>>>>>>> 7b26cb43c25121770ac979fd5e73f2195d42e40b
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
})
<<<<<<< HEAD
export class CartComponent implements OnChanges {

  @Input() items: CartItem[] = [];
  total = 0;

  @Output() idProductEventEmitter = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
  //'items'-> es el nombre del atributo que estamos recibiendo del Input
  //let itemsChanges = changes['items'];
    this.calculateTotal();
    this.saveSession();
  }

  onDeleteCart(id: number) {
    this.idProductEventEmitter.emit(id)
  }

  calculateTotal(): void {
    this.total = this.items.reduce((acumulator, item) => acumulator + item.quantity * item.product.price, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

=======
export class CartComponent {

  @Input() items : CartItem [] = [];

  @Input() total =0;

  @Output() idProductEventEmitter = new EventEmitter();

  onDeleteCart(id:number){
    this.idProductEventEmitter.emit(id)
  }

>>>>>>> 7b26cb43c25121770ac979fd5e73f2195d42e40b
}
