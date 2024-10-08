import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from './catalog/catalog.component';
<<<<<<< HEAD
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from '../componets/navbar/navbar.component';
import { CartModalComponent } from '../componets/cart-modal/cart-modal.component';
=======
import { CartComponent } from './cart/cart.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from '../componets/navbar/navbar.component';
>>>>>>> 7b26cb43c25121770ac979fd5e73f2195d42e40b

@Component({
  selector: 'cart-app',
  standalone: true,
<<<<<<< HEAD
  imports: [CatalogComponent, CartModalComponent, NavbarComponent],
=======
  imports: [CatalogComponent, CartComponent, NavbarComponent],
>>>>>>> 7b26cb43c25121770ac979fd5e73f2195d42e40b
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  //Define una propiedad products para almacenar la lista de productos
  //Debemos inicializar products
  products: Product[] = [];

  items: CartItem[] = [];

<<<<<<< HEAD
  // total: number = 0;

  showCart: boolean = false;
=======
  total: number = 0;

  showCart : boolean = false;
>>>>>>> 7b26cb43c25121770ac979fd5e73f2195d42e40b

  //El constructor inyecta una instancia de ProductService
  //El componente CartApp. usa el servicio ProductService para obtener una lista de productos.
  constructor(private service: ProductService) {
    // Inyección de dependencias: El servicio ProductService se inyecta en el componente
  }
<<<<<<< HEAD
  //ngOnInit se llama después de la creación del componente y la inyección de dependencias
  ngOnInit(): void {
    //Aquí estamos inicializando la lista de productos al llamar a un método del servicio inyectado
    this.products = this.service.findAll();
    //sessionStorage.getItem('cart') para recuperar los datos del carrito almacenados en la sesión
    //JSON.parse(sessionStorage.getItem('cart') || '[]'): Si no hay datos en sessionStorage, devuelve una cadena vacía
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    // this.calculateTotal();
=======

  ngOnInit(): void {
    //ngOnInit se llama después de la creación del componente y la inyección de dependencias
    this.products = this.service.findAll();
    //Aquí estamos inicializando la lista de productos al llamar a un método del servicio inyectado
    this.items = JSON.parse(sessionStorage.getItem('cart')|| '[]');
    this.calculateTotal();
>>>>>>> 7b26cb43c25121770ac979fd5e73f2195d42e40b
  }

  onAddCart(product: Product): void {
    //Dos formas de hacerlo:
    //1-
    //const hasItem = this.items.find(item => {
    //return item.product.id === product.id;
    //2-
    // Busca si el producto ya existe en el carrito
    const hasItem = this.items.find(item => item.product.id === product.id);
    //Usando ===, te aseguras de que ambos valores sean iguales y del mismo tipo
    // Si el producto ya está en el carrito (es decir, si hasItem no es undefined)
    if (hasItem) {
      // Crear un nuevo array de items del carrito con la cantidad actualizada para el producto existente
      this.items = this.items.map(item => {
        // Si el id del producto en el item actual coincide con el id del producto que se está agregando
        if (item.product.id == product.id) {
          // Devolver una copia del item con la cantidad incrementada en 1
          return {
            ...item,
            quantity: item.quantity + 1
          }
        }
        // Si no coincide, devolver el item tal cual
        return item;
      })
    } else {
      // Si el producto no está en el carrito
      // Crear un nuevo array de items del carrito agregando un nuevo objeto para el producto
      this.items = [...this.items, { product: { ...product }, quantity: 1 }]
      //Crear una copia del producto que se está agregando y establecer la cantidad inicial a 1
    }
<<<<<<< HEAD
    // this.calculateTotal();
    // this.saveSession();
=======
    this.calculateTotal();
    this.saveSession();
>>>>>>> 7b26cb43c25121770ac979fd5e73f2195d42e40b
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter(item => item.product.id != id);
<<<<<<< HEAD
    if(this.items.length == 0){
      sessionStorage.removeItem('cart');
      sessionStorage.clear();
    }
    // this.calculateTotal();
    // this.saveSession();
  }

  // calculateTotal(): void {
  //   this.total = this.items.reduce((acumulator, item) => acumulator + item.quantity * item.product.price, 0);
  // }

  // //Aquí, JSON.stringify(this.items) convierte el array this.items
  // // (que contiene objetos de tipo CartItem) en una cadena de texto JSON.
  // // Esto es necesario porque sessionStorage solo puede almacenar cadenas de texto.
  // saveSession(): void {
  //   sessionStorage.setItem('cart', JSON.stringify(this.items));
  // }

  openCloseCart(): void {
=======
    this.calculateTotal();
    this.saveSession();
  }

  calculateTotal(): void {
    this.total = this.items.reduce((acumulator, item) => acumulator + item.quantity * item.product.price, 0);
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

  openCart(): void{
>>>>>>> 7b26cb43c25121770ac979fd5e73f2195d42e40b
    this.showCart = !this.showCart;
  }
}
