import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {


  // It is better to create a Products class.ts
  // to define properties instead of using <any>
  public products: Array<any> = [];

  public keyword: string = "";

  // In Angular, when you add the `private` keyword to a variable in the constructor,
  // it automatically creates a private property for the class and assigns the parameter to that property.
  // This is commonly used for dependency injection.
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.http.get<Array<any>>('http://localhost:8089/products')
      .subscribe({
        next: data => {
          this.products = data
        },
        error: err => {
          console.log(err)
        }
      })
  }
  handleCheckProduct(product: any) {
    this.http.patch('http://localhost:8089/products/' + product.id,
      {checked: !product.checked})
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

  deleteProduct(item: any): void {
    let index = this.products.indexOf(item)
    this.products.splice(index, 1);
  }

  search(): void {
    console.log(this.keyword);
    console.log(this.products.filter((item: any) => item.name.includes(this.keyword)));
    this.products = this.products.filter((item: any) => item.name.includes(this.keyword));

  }
}
