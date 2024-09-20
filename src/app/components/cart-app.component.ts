import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogComponent } from './catalog/catalog.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from '../componets/navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'cart-app',
  standalone: true,
  imports: [CatalogComponent, NavbarComponent, RouterOutlet],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  //Define una propiedad products para almacenar la lista de productos
  //Debemos inicializar products
  items: CartItem[] = [];

  total: number = 0;

  //El constructor inyecta una instancia de ProductService
  //El componente CartApp. usa el servicio ProductService para obtener una lista de productos.
  constructor(
    private sharingDataService: SharingDataService,
    private service: ProductService,
    private router: Router
  ) {
    // Inyección de dependencias: El servicio ProductService se inyecta en el componente
  }
  //ngOnInit se llama después de la creación del componente y la inyección de dependencias
  ngOnInit(): void {
    //Aquí estamos inicializando la lista de productos al llamar a un método del servicio inyectado
    //sessionStorage.getItem('cart') para recuperar los datos del carrito almacenados en la sesión
    //JSON.parse(sessionStorage.getItem('cart') || '[]'): Si no hay datos en sessionStorage, devuelve una cadena vacía
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    //La presencia de estos metodos no significa que se vayan a ejecutar siempre que se crea 
    //el componente, sino que se subscriben los metodos por si son llamados.
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart(): void {
    this.sharingDataService.productEventEmmiter.subscribe(product => {
      console.log('Producto añadido al carrito ');
      const hasItem = this.items.find(item => item.product.id === product.id);
      if (hasItem) {
        this.items = this.items.map(item => {
          if (item.product.id == product.id) {
            return {
              ...item,
              quantity: item.quantity + 1
            }
          }
          return item;
        })
      } else {
        this.items = [...this.items, { product: { ...product }, quantity: 1 }]
      }
      this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'], {
        state: { items: this.items, total: this.total }
      })
      Swal.fire({
        title: "Shopping",
        text: "Nuevo producto agregado al carro!",
        icon: "success"
      });
    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe(id => {
      console.log('El ID: ' + id + ' se ha ejecutado el evento idProductEventEmitter ')
      Swal.fire({
        title: "Está seguro que desea eliminar el producto?",
        text: "Cuidado, el producto se eliminará del carro",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar producto!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.items = this.items.filter(item => item.product.id != id);
          if (this.items.length == 0) {
            sessionStorage.removeItem('cart');
            sessionStorage.clear();
          }
          this.calculateTotal();
          this.saveSession();
          //then-> Las promesas representan tareas que se ejecutan de forma asíncrona
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/cart'], {
              state: { items: this.items, total: this.total }
            })
          })
          Swal.fire({
            title: "Eliminado!",
            text: "El producto se ha eliminado correctamente.",
            icon: "success"
          });
        }
      });

    })
  }

  calculateTotal(): void {
    this.total = this.items.reduce((acumulator, item) => acumulator + item.quantity * item.product.price, 0);
  }

  //Aquí, JSON.stringify(this.items) convierte el array this.items
  // (que contiene objetos de tipo CartItem) en una cadena de texto JSON.
  // Esto es necesario porque sessionStorage solo puede almacenar cadenas de texto.
  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
