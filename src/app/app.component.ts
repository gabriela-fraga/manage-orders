import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'manage-orders';
  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}
  
  ngOnInit() {
    this.ordersService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }
}

export class Order {
  id: number;
  products: Product[] = [];

  constructor(id: number) {
      this.id = id;
      this.products.push(new Product(1, 'apple'));
      this.products.push(new Product(2, 'strawberry'));
      this.products.push(new Product(3, 'pineapple'));
  }
}

class Product {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}