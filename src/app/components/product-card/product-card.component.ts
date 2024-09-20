import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html'
})
export class ProductCardComponent {

  //para el hijo Input
  @Input() product !: Product;

  //para el padre Output
  @Output() productEventEmmiter: EventEmitter<Product> = new EventEmitter();

  onAddCart(product: Product) {
    this.productEventEmmiter.emit(product);
  }
}
