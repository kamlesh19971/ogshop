import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';
import { BsNavbarComponent } from '../bs-navbar/bs-navbar.component';
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


  constructor(private cartService: ShoppingCartService, private navBar: BsNavbarComponent) { }

  addToCart() {
    this.cartService.addToCart(this.product).then(() => {
      this.reloadCart.emit();
      this.navBar.loadCartIcount();
    });
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product).then(() => {
      this.reloadCart.emit();
      this.navBar.loadCartIcount();
    });
  }

}
