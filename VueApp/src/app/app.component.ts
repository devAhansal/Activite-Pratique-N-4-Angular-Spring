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
    { title : "Products", "route" : "/products", icon: "arrow-down-up"},
    { title : "New Product", "route" : "/newProdcut", icon: "plus-circle"},
  ];
  public currentActions: any;
  setCurrentAction( action : any) {
    this.currentActions = action ;
  }


}
