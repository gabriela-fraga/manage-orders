import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersService } from './order/orders.service';
import { Order } from './order/order';
import { OrderComponent } from './order/order.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'manage-orders';
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.ordersService.getOrders().subscribe((orders) => {
      this.orders = orders;
    });
  }

  addOrder() {
    this.ordersService.addOrder().subscribe(orders => {
      this.orders = orders;
    })
  }
}
