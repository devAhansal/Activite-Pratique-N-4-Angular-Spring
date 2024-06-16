import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host: string = "http://localhost:8089";

  constructor(private http: HttpClient) {
  }

  public searchProducts(keyword: string = '',page: number = 1, size: number = 4) {
     return this.http.get<Array<Product>>(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'});
   }

  /* public getProducts(page: number = 1, size: number = 4): Observable<Array<Product>> {
     return this.http.get<Array<Product>>(`${this.host}/products?_page=${page}&_limit=${size}`);
   }
   */
  public checkProduct(product: Product): Observable<any> {
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked: !product.checked});
  }

  public saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`, product);
  }

  public deleteProduct(product: Product) {
    return this.http.delete<Product>(`${this.host}/products/${product.id}`);
  }

  /*public searchProducts(keyword: string, page: number, size: number): Observable<Array<Product>> {
    const url = `${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`;
    return this.http.get<Array<Product>>(url);
  }*/
}
