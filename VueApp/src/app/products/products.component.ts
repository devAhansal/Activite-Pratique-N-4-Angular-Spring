import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  totalPages: number = 10;
  currentPage: number = 1;
  pageSize: number = 2;
  // It is better to create a Products class.ts
  // to define properties instead of using <any>
  public products: Array<Product> = [];

  public products$!: Observable<Array<Product>>;

  public keyword: string = "";

  // In Angular, when you add the `private` keyword to a variable in the constructor,
  // it automatically creates a private property for the class and assigns the parameter to that property.
  // This is commonly used for dependency injection.
  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts(): void {
    //this.products$ = this.productService.getProducts(1,4);
    this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize)
      .subscribe({
        next: (resp) => {
          this.products = resp.body as Product[];
          let totalProducts: number = parseInt(resp.headers.get('x-total-count') ?? '10', 10);
          this.totalPages = Math.floor(totalProducts / this.pageSize);
          if (totalProducts % this.pageSize != 0) {
            this.totalPages = this.totalPages + 1;
          }
        },
        error: err => {
          console.log(err)
        }
      });
  }

  handleGotoPage(page: number) {
    this.currentPage=page;
    this.searchProducts();
  }

  handleCheckProduct(product:Product) {
    this.productService.checkProduct(product)
      .subscribe({
        next: updatedProduct => {
          //product.checked = !product.checked;
          this.searchProducts();
        },
        error: err => {
          console.log(err)
        }
      })
  }

  handledeleteProduct(product:Product): void {
    if (confirm("Etes vous sur ?"))
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          this.searchProducts();
        }
      })
  }

  /*
 search(): void {
   this.currentPage = 1;
   this.totalPages = 0;
   console.log('Searching for:', this.keyword); // Log the keyword
   this.productService.searchProducts(this.keyword, this.currentPage, this.pageSize).subscribe({
     next: value => {
       console.log('Search results:', value); // Log the search results
       this.products = value;
     },
     error: err => {
       console.error('Search error:', err);
     }
   });*/


}
