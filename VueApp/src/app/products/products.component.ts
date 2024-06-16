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


  // It is better to create a Products class.ts
  // to define properties instead of using <any>
  public products: Array<Product> = [];

  public products$!:Observable<Array<Product>>;

  public keyword: string = "";

  // In Angular, when you add the `private` keyword to a variable in the constructor,
  // it automatically creates a private property for the class and assigns the parameter to that property.
  // This is commonly used for dependency injection.
  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.products$ = this.productService.getProducts();
    /*this.productService.getProducts()
      .subscribe({
        next: data => {
          this.products = data
        },
        error: err => {
          console.log(err)
        }
      })*/
  }
  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product)
      .subscribe({
        next: updatedProduct => {
          //product.checked = !product.checked;
          this.getProducts();
        },
        error: err => {
          console.log(err)
        }
      })
  }

  handledeleteProduct(product: Product): void {
    if(confirm("Etes vous sur ?"))
     this.productService.deleteProduct(product).subscribe({
       next: value => {
         this.getProducts();
    }
     })
  }

  search(): void {
    console.log(this.keyword);
    console.log(this.products.filter((item: any) => item.name.includes(this.keyword)));
    this.products = this.products.filter((item: any) => item.name.includes(this.keyword));

  }
}
