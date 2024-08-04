import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: Order[] = [];

  constructor() {}

  getOrders() {
    return of(this.orders)
  }

  addOrder() {
    this.orders.push(new Order(this.orders.length >= 1 ? this.orders.length + 1 : 1))
    return of(this.orders)
  }

  addProduct(orderId: number, product: string) {
    const order = this.orders.find(order => order.id === orderId);
      if (order) {
        order.addProduct(product);
      }
      return of(order).pipe(map(order => {
        if (order) {
          return order;
        } else {
          throw new Error('ERROR: Order not found');
        }
    }))
  }

  removeProduct(orderId: number, product: string) {
    const order = this.orders.find(order => order.id === orderId);
      if (order) {
        order.removeProduct(product);
      }
      return of(order).pipe(map(order => {
        if (order) {
          return order;
        } else {
          throw new Error('ERROR: Order not found');
        }
    }))
  }

  closeOrder(orderId: number) {
    const order = this.orders.find(order => order.id === orderId);
    if(order && order.products?.length > 0) {
      order.closeOrder();
    }return of(order).pipe(map(order => {
      if (order && order.products?.length > 0) {
        return order;
      } else if (order && order.products?.length <= 0){
        throw new Error('ERROR: Can\'t close order without a product');
      } else {
        throw new Error('ERROR: Order not found');
      }
  }));
  }
}
