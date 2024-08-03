import { Injectable } from '@angular/core';
import { Order } from './app.component'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: Order[] = [];

  constructor() {
    this.orders.push(new Order(1));
    this.orders.push(new Order(2));
    this.orders.push(new Order(3));
  }

  getOrders() {
    return new Observable<Order[]>(observer => {
      observer.next(this.orders);
      observer.complete();
    })
  }
}
