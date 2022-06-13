import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart!: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart = await this.shoppingCartService.getCart();
    console.log(this.cart.totalItemsCount);
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

}
