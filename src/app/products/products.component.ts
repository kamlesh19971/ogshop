import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: string;
  cart!: any;

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) {
    this.loadProducts();
    this.reloadCart();
  }

  loadProducts() {
    this.productService.getAll().then(products => {
      this.products = products;
      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category')!;
        this.filteredProducts = this.category ? this.products.filter(p => p.category === this.category) : this.products;
      });
    })
  }

  reloadCart() {
    this.shoppingCartService.getCart().then(cart => {
      this.cart = cart;
    })
  }

  ngOnInit(): void {
  }

}
