import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories!: any[];
  product: any;

  constructor(private router: Router, private route: ActivatedRoute, private categoryService: CategoryService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadCategories();

    let id = this.route.snapshot.paramMap.get('id');

    console.log(id)
    if (id) {
      this.productService.get(id).then(p => {
        console.log(p)
        this.product = p;
      })
    }

  }

  async loadCategories() {
    this.categories = await this.categoryService.getCategories();
    console.log(this.categories)
  }

  save(product: any) {
    console.log(product);

    this.productService.create(product);
    this.router.navigate(['/admin/products'])
  }


}
