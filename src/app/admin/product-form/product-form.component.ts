import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories!: any[];
  product: Product = {
    key: '',
    title: '',
    category: '',
    imageUrl: '',
    price: 0
  };
  id!: any;

  constructor(private router: Router, private route: ActivatedRoute, private categoryService: CategoryService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadCategories();

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.get(this.id).then(p => {
        this.product = p;
      })
    }

  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
  }

  save(product: any) {

    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);

  }

}
