import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private  http: HttpClient) { }

  public getProducts() : Observable<Array<Product>> {
   return this.http.get<Array<Product>>('http://localhost:8089/products');
  }
  public checkProduct(product:Product): Observable<any> {
    return this.http.patch<Product>('http://localhost:8089/products/' + product.id,
      {checked: !product.checked});
  }

  public deleteProduct(product:Product){
    return this.http.delete<Product>('http://localhost:8089/products/' + product.id);
  }
}
