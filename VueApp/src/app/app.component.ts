import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  actions : Array<any> = [
    { title : "Home", "route" : "/home", icon: "house"},
    { title : "Products", "route" : "/product", icon: "arrow-down-up"},
    { title : "New Product", "route" : "/newProduct", icon: "plus-circle"},
  ]


  title = 'VueApp';

  public currentRoute: any;

  constructor(private router: Router) {

  }
  gotoHome(): void {
    this.currentRoute= 'home';
    this.router.navigateByUrl("/home");
  }
  gotProducts(): void {
    this.currentRoute= 'products';
    this.router.navigateByUrl("/products");
  }

  gotNewProducts() {
    this.currentRoute= 'newProdcut';
    this.router.navigateByUrl("/newProdcut");
  }
}
