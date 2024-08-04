import { CommonModule } from '@angular/common';
import { Component, inject, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersService } from './orders.service';
import { FormsModule } from '@angular/forms';
import { catchError, Subject, takeUntil } from 'rxjs';
import { Order } from './order';

@Component({
  selector: 'order',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: '../app.component.scss',
})
export class OrderComponent implements OnDestroy {
  @Input() order: Order = new Order(-1);
  addToOrder = -1;
  newProduct = '';
  private destroyer: Subject<any> = new Subject();
  private ordersService = inject(OrdersService)

  constructor() {}

  ngOnDestroy() {
    this.destroyer.complete();
    this.destroyer.unsubscribe();
  }

  addProduct(orderId: number) {
    this.addToOrder = orderId;
  }

  saveProduct(orderId: number) {
    if (this.newProduct) {
      this.ordersService
        .addProduct(orderId, this.newProduct)
        .pipe(
          takeUntil(this.destroyer),
          catchError((error) => {
            console.log(error);
            throw new Error(error);
          })
        )
        .subscribe((order) => {
          this.order = order;
        });
    } else {
      console.log('ERROR: Need to inform a product');
    }
  }

  removeProduct(orderId: number, product: string) {
    this.ordersService
      .removeProduct(orderId, product)
      .pipe(
        takeUntil(this.destroyer),
        catchError((error) => {
          console.log(error);
          throw new Error(error);
        })
      )
      .subscribe();
  }

  closeOrder(orderId: number) {
    this.ordersService
      .closeOrder(orderId)
      .pipe(
        takeUntil(this.destroyer),
        catchError((error) => {
          console.log(error);
          throw new Error(error);
        })
      )
      .subscribe();
  }
}
