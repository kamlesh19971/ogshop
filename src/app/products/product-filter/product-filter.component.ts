import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories!: any[];

  @Input('category') category!: string;

  constructor(private categoryService: CategoryService) {

    this.categoryService.getCategories().then(cats => this.categories = cats);
  }

  ngOnInit(): void {
  }

}
