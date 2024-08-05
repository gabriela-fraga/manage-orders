import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersService } from './order/orders.service';
import { Order } from './order/order';
import { OrderComponent } from './order/order.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, OrderComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'manage-orders';
  orders: Order[] = [];
  filters: boolean[] = [true, true];
  private destroyer: Subject<any> = new Subject();

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.ordersService
      .getOrders()
      .pipe(takeUntil(this.destroyer))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  ngOnDestroy() {
    this.destroyer.complete();
    this.destroyer.unsubscribe();
  }

  addOrder() {
    this.ordersService
      .addOrder()
      .pipe(takeUntil(this.destroyer))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  applyFilters() {
    this.ordersService
      .filterOrders(this.filters)
      .pipe(takeUntil(this.destroyer))
      .subscribe((orders) => {
        this.orders = orders;
      });
  }
}
