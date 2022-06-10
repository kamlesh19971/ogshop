import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  category!: string;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll().then(products => {
      this.products = products;

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category')!;
        this.filteredProducts = this.category ? this.products.filter(p => p.category === this.category) : this.products;
      })
    })
  }

  ngOnInit(): void {
  }

}
