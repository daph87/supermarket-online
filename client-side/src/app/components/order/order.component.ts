import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Cart } from 'src/app/models/cart';
import { CartsService } from 'src/app/services/carts.service';
import { Order } from 'src/app/models/order';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { OrdersService } from 'src/app/services/orders.service';
import { City } from 'src/app/models/city';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public order: Order = new Order();
  public connectedCustomer: Customer;
  public items: Item[];
  public cart: Cart;
  public finalPrice: number = 0;
  public deliveryCityInput: string;
  public deliveryStreetInput: string;
  public houseNumberInput: number;
  public cities: City[];
  public exist: boolean = false;

  constructor(public redux: NgRedux<AppState>, public router: Router, private citiesCustomer: CitiesService, public ordersService: OrdersService, public cartsService: CartsService,
    public itemsService: ItemsService) { }

  ngOnInit() {
    // get customer details via redux or local storage
    this.connectedCustomer = this.redux.getState().connectedUser;

    if (this.connectedCustomer === undefined) {
      let local = localStorage.getItem("user");
      if (local) {
        this.connectedCustomer = JSON.parse(local)
      }
      // if user is not connected, redirect to home Page
      else if (this.connectedCustomer === undefined) {
        this.router.navigate(["/home"])
      }

      // if user is connected , he cannot go to order page without clicking the order button
      if (this.connectedCustomer && this.redux.getState().items === undefined) {
        this.router.navigate(["/main"])
      }

    }

    this.citiesCustomer.getAllCities().subscribe(allCities => {
      this.cities = allCities;
    })

    if (this.connectedCustomer) {
      this.deliveryCityInput = this.connectedCustomer.city;
      this.deliveryStreetInput = this.connectedCustomer.street;
      this.houseNumberInput = this.connectedCustomer.houseNumber;


      // get cart of customer
      this.cartsService
        .getCartFromUser(this.connectedCustomer._id)
        .subscribe(
          cart => {
            this.cart = cart
            this.itemsService.getAllItemsOfOneCart(this.cart[0]._id).subscribe(allItems => {
              this.items = allItems;

              this.items.map(i => {
                this.finalPrice = this.finalPrice + i.totalPrice;
                this.order.cartID = i.cartID;
                this.order.customerID = this.connectedCustomer._id;
                this.order.finalPrice = this.finalPrice;
              })
            })
          }
        )
    }
  }

  // Function to unable past date 
  public date() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let newDay;
    let newMonth;

    if (day < 10) { newDay = "0" + day; }
    if (month < 10) { newMonth = "0" + month; }

    let newDate = year + '-' + newMonth + '-' + newDay;
    return newDate;
  }


  // Add order to dataBase
  public addOrder(): void {

    this.order.deliveryCity = this.deliveryCityInput;
    this.order.deliveryStreet = this.deliveryStreetInput;
    this.order.houseNumber = this.houseNumberInput;
    this.ordersService
      .addOrder(this.order)

      .subscribe(() => {
        console.log(this.order)
      }, err => alert(err));

    if (confirm("Please confirm your order.")) {
      this.itemsService
        .deleteItems(this.cart[0]._id)
        .subscribe(() => {
          this.redux.getState().finalPrice = 0;
          let date = new Date;
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let year = date.getFullYear();
          let fullOrderDate = year + "-" + month + "-" + day;
          localStorage.setItem('orderDate', JSON.stringify(fullOrderDate));
          this.router.navigate(["/main"]);
        })

    }
  }

  // Back to main page button 
  public backToShopping(): void {
    this.router.navigate(["/main"])
  }
}
