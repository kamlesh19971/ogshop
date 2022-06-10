import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products!: Product[];
  filteredProducts!: any[];
  // tableResource!: DataTableResource<Product>;
  items!: Product[];
  itemCount!: number;
  dtOptions: DataTables.Settings = {};


  constructor(private productService: ProductService) {

  }
  ngOnDestroy(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // this.productService.preBuildData();
    this.loadProducts();
  }

  async loadProducts() {
    await this.productService.getAll().then(products => {
      this.filteredProducts = this.products = products;
      // this.initializeTable(products);
    });
  }

  // private initializeTable(products: Product[]) {

  //   this.tableResource = new DataTableResource(products);

  //   this.tableResource.query({ offset: 0 })
  //     .then(items => this.items = items);

  //   this.tableResource.count()
  //     .then(itemCount => this.itemCount = itemCount);
  // }

  filter(query: string) {
    this.filteredProducts = query ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

  // reloadItems(params: any) {
  //   if (!this.tableResource) return;

  //   this.tableResource.query(params)
  //     .then(items => this.items = items);
  // }

  sort(key: string) {


    // this.
  }

}
