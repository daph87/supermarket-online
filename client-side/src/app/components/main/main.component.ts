import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { Cart } from 'src/app/models/cart';
import { ProductsService } from 'src/app/services/products.service';
import { CartsService } from 'src/app/services/carts.service';
import { Manager } from 'src/app/models/manager';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public connectedCustomer: Customer;
  public connectedAdmin: Manager;
  public products: Product[];
  public cart: Cart;
  public productName: string;
  public searchProduct: Product[] = [];
  public oldProducts: Product[] = [];

  constructor(public redux: NgRedux<AppState>, public router: Router, private productsService: ProductsService,
    private cartsService: CartsService) { }

  ngOnInit() {

    // User info from Redux or local Storage
    this.connectedCustomer = this.redux.getState().connectedUser;
    if (this.connectedCustomer === undefined) {
      let local = localStorage.getItem("user");

      if (local) {
        this.connectedCustomer = JSON.parse(local)
      }
      // Admin info from Redux or local Storage
      else {
        this.connectedAdmin = this.redux.getState().connectedAdmin;
        if (this.connectedAdmin === undefined) {
          let localAdmin = localStorage.getItem("admin");

          if (localAdmin) {
            this.connectedAdmin = JSON.parse(localAdmin)
          }
        }
      }
    }
    // If user or admin is not connected, impossible to go to main page
    if (this.connectedCustomer === undefined && this.connectedAdmin === undefined) {
      this.router.navigate(["/home"])
    }

    if (this.connectedCustomer) {
      // Getting Cart from User
      this.cartsService.getCartFromUser(this.connectedCustomer._id).subscribe(c => {
        this.cart = c
      })
    }

    // Getting all products when landing on main page
    this.productsService
      .getAllProducts()
      .subscribe(
        allProducts => {
          this.products = allProducts;
          this.oldProducts = allProducts
        },
        err => alert(err),
        () => console.log("Complete" + this.products[0])

      )
  }

  public logOut(): void {
    this.redux.getState().connectedAdmin = undefined;
    localStorage.removeItem("admin");
    this.router.navigate(["/home"])
  }


  public allVegetables(): void {
    this.productsService
      .getVegetablesProducts()
      .subscribe(
        vegetablesProducts => this.products = vegetablesProducts,
        err => alert(err),
        () => console.log("Complete")

      )
  }

  public allMilkAndEggs(): void {
    this.productsService
      .getMilkAndEggsProducts()
      .subscribe(
        milkAndEggsProducts => this.products = milkAndEggsProducts,
        err => alert(err),
        () => console.log("Complete")

      )
  }

  public allFruits(): void {
    this.productsService
      .getFruitsProducts()
      .subscribe(
        fruitsProducts => this.products = fruitsProducts,
        err => alert(err),
        () => console.log("Complete")

      )
  }

  public allBathrooms(): void {
    this.productsService
      .getBathroomsProducts()
      .subscribe(
        bathroomsProducts => this.products = bathroomsProducts,
        err => alert(err),
        () => console.log("Complete")

      )
  }

  public allAlcohol(): void {
    this.productsService
      .getAlcoholProducts()
      .subscribe(
        alcoholProducts => this.products = alcoholProducts,
        err => alert(err),
        () => console.log("Complete")

      )
  }

  // Search Input Function by clicking on button or enter on input
  public searchField(): void {
    this.products = this.oldProducts
    this.searchProduct = [];

    if (this.productName) {
      this.products.map(p => {

        this.productName = this.productName.toLowerCase();
        p.productName = p.productName.toLowerCase();
        if (p.productName.indexOf(this.productName) > -1) {
          this.searchProduct.push(p)
        }
      });
      this.products = this.searchProduct
    }

  }
}
