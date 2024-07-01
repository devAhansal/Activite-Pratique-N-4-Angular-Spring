import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  // In Angular, when you add the `private` keyword to a variable in the constructor,
  // it automatically creates a private property for the class and assigns the parameter to that property.
  // This is commonly used for dependency injection.
  constructor(private productService: ProductService, private router: Router,
              public appState: AppStateService) {
  }

  ngOnInit(): void {
    this.searchProducts();
  }

  searchProducts(): void {
    this.appState.setProductState({
      status:"LOADING",
    })
    //this.products$ = this.productService.getProducts(1,4);
    this.productService.searchProducts(this.appState.productsState.keyword, this.appState.productsState.currentPage, this.appState.productsState.pageSize)
      .subscribe({
        next: (resp) => {
          let products = resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get('X-Total-Count')!);
         // this.appState.productsState.totalProducts=totalProducts;
         let totalPages = Math.floor(totalProducts / this.appState.productsState.pageSize);
          if (totalProducts % this.appState.productsState.pageSize != 0) {
            this.appState.productsState.totalPages = this.appState.productsState.totalPages + 1;
          }

          this.appState.setProductState({
            products:products,
            totalProducts:totalProducts,
            totalPages:totalPages,
            status:"LOADED",
          })
        },
        error: err => {
          console.log(err)
          this.appState.setProductState({
            status:"ERROR",
            erroMessage:err
          });
        }
      });
  }

  handleGotoPage(page: number) {
    this.appState.productsState.currentPage = page;
    this.searchProducts();
  }

  handleCheckProduct(product: Product) {
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

  handledeleteProduct(product: Product): void {
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


  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
