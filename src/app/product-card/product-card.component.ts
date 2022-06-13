import { Component, Input, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { Product } from '../models/product';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: any;

  @Output() reloadProduct = new EventEmitter<any>();

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  async addToCart() {
    this.shoppingCartService.addToCart(this.product).then(() => {
      this.reloadProduct.emit();
    });
  }

  getQuantity() {
    if (!this.shoppingCart) return 0;

    const item = this.shoppingCart.items.find((i: any) => i.product.key === this.product.key);
    return item ? item.quantity : 0;
  }

  async removeFromCart() {
    this.shoppingCartService.removeFromCart(this.product).then(() => {

      this.reloadProduct.emit();
    });
  }
}
