import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  @Output() reloadCart = new EventEmitter<any>();


  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product).then(() => {
      this.reloadCart.emit();
    });
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product).then(() => {
      this.reloadCart.emit();
    });
  }

}
