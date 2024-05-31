import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  public products: any;
  public keyword: string = "";

  constructor() {

  }
  ngOnInit(): void {
    this.products = [
      { "id": 1, "name": "computer", "price": 4300 },
      { "id": 2, "name": "computer", "price": 4300 },
      { "id": 3, "name": "computer", "price": 4300 }
    ];
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
