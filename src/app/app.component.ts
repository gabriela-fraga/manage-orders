import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersService } from './orders.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'manage-orders';
  orders: Order[] = [];
  addToOrder = -1;
  newProduct = '';

  constructor(private ordersService: OrdersService) {}
  
  ngOnInit() {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }

  addOrder() {
    this.ordersService.addOrder().subscribe(orders => {
      this.orders = orders;
    })
  }

  addProduct(orderId: number) {    
    this.addToOrder = orderId;
  }

  saveProduct(orderId: number) {
    if(this.newProduct) {
      this.ordersService.addProduct(orderId, this.newProduct).subscribe(order => {
        const orderIndex = this.orders.findIndex(order => order.id === orderId);
        if (orderIndex !== -1) {
          this.newProduct = '';
          this.orders[orderIndex] = order;
        } else {
          console.log('ERROR: Order not found');
        }
      })
    } else {
      console.log('ERROR: Need to inform a product');
    }
  }

  removeProduct(orderId: number, product: string) {
    this.ordersService.removeProduct(orderId, product).subscribe(order => {
      const orderIndex = this.orders.findIndex(order => order.id === orderId);
      if (orderIndex == -1) {
        console.log('ERROR: Order not found');
      }
    });
  }

  closeOrder(orderId: number) {
    this.ordersService.closeOrder(orderId).subscribe(order => {
      console.log(order)
    });
  }
}

export class Order {
  id: number;
  products: string[] = [];
  status: string = 'OPEN';

  constructor(id: number) {
      this.id = id;
  }

  addProduct(product: string) {
    this.products.push(product)
  }

  removeProduct(product: string) {
    const productIdx = this.products.indexOf(product);
    if (productIdx > -1) {
      this.products.splice(productIdx, 1);
    }
  }

  closeOrder() {
    this.status = 'CLOSED';
  }

}
