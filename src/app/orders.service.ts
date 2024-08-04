import { Injectable } from '@angular/core';
import { Order } from './app.component'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: Order[] = [];

  constructor() {}

  getOrders() {
    return new Observable<Order[]>(observer => {
      observer.next(this.orders);
      observer.complete();
    })
  }

  addOrder() {
    return new Observable<Order[]>(observer => { 
      this.orders.push(new Order(this.orders.length >= 1 ? this.orders.length + 1 : 1))
      observer.next(this.orders);
      observer.complete();
    })
  }

  addProduct(orderId: number, product: string) {
    return new Observable<Order>(observer => {
      const orderIndex = this.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        this.orders[orderIndex].addProduct(product);
      } else {
        console.log('ERROR: Id not found');
      }
      observer.next(this.orders.at(orderIndex));
      observer.complete();
    })
  }

  removeProduct(orderId: number, product: string) {
    return new Observable<Order>(observer => {
      const orderIndex = this.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        this.orders[orderIndex].removeProduct(product);
      } else {
        console.log('ERROR: Id not found');
      }
    });
  }

  closeOrder(orderId: number) {
    return new Observable<Order>(observer => {
      const orderIndex = this.orders.findIndex(order => order.id === orderId);
      if (orderIndex !== -1) {
        if(this.orders[orderIndex].products.length <= 0) {
          console.log('ERROR: Can\'t close order without a product');
        } else {
          this.orders[orderIndex].closeOrder();
        }
      } else {
        console.log('ERROR: Id not found');
      }
    });
  }
}
