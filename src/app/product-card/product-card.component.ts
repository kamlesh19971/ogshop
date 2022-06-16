import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { Product } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  @Output() reloadCart = new EventEmitter<any>();

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  async addToCart() {
    this.shoppingCartService.addToCart(this.product).then(() => {
      // this.reloadCart.emit();
    });
  }



}
