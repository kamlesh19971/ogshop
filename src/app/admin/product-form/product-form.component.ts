import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories!: any[];

  constructor(private categoryService: CategoryService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadCategories()
  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
    console.log(this.categories)
  }

  save(product: any) {
    console.log(product);

    this.productService.create(product);
  }


}
