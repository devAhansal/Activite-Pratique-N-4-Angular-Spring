import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  constructor() {
  }

  public productsState: any = {
    // It is better to create a Products class.ts
    // to define properties instead of using <any>
    products: [],
    keyword: "",
    totalPages: 0,
    pageSize: 3,
    currentPage: 1,
    totalProducts: 0,
    status:"",
    erroMessage:""
  }

  public setProductState(state: any): void {
    this.productsState = {...this.productsState, ...state}
  }


}
