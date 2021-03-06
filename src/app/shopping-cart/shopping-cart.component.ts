import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$!: any;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.reloadCart();
  }

  reloadCart() {
    this.shoppingCartService.getCart().then(cart => {
      this.cart$ = cart
    });
  }

  clearCart() {
    this.shoppingCartService.clearCart().then(() => {
      this.reloadCart();
    });
  }

}
