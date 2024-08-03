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
}
