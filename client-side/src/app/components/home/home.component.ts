import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Cart } from 'src/app/models/cart';
import { CartsService } from 'src/app/services/carts.service';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Order } from 'src/app/models/order';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/models/item';
import { ManagersService } from 'src/app/services/managers.service';
import { Manager } from 'src/app/models/manager';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public email: string;
  public password: string;
  public customers: Customer[];
  public connectedCustomer: Customer;
  public isConnected: boolean = false;
  public cart = new Cart();
  public existingCart: Cart;
  public products: Product[];
  public orders: Order[];
  public loginError: string;
  public itemsOfCart: Item[];
  public ordersOfOneCustomer: Order[];
  public customerNotification: string;
  public shoppingMessage: string = "Start Shopping";
  public loginSuccess: string;
  public welcomeMessage: string = "guest";
  public managers: Manager[];


  constructor(private customersService: CustomersService, private ordersService: OrdersService,
    private itemsService: ItemsService, private cartsService: CartsService,
    private productsServices: ProductsService, private router: Router,
    private redux: NgRedux<AppState>, private managersService: ManagersService) { }

  ngOnInit() {

    this.customersService.getAllCustomers().subscribe(
      customers => this.customers = customers,
      err => console.log(err))

    this.productsServices.getAllProducts().subscribe(
      products => this.products = products,
      err => console.log(err)
    )

    this.ordersService.getAllOrders().subscribe(
      orders => this.orders = orders,
      err => console.log(err)
    )

    this.managersService.getAllManagers().subscribe(
      managers => this.managers = managers,
      err => console.log(err))
  }


  // User logout
  public logout(): void {
    this.connectedCustomer = undefined;
    localStorage.removeItem("user");
    this.email = "";
    this.password = "";
    this.loginError = "You are not logged";
    this.welcomeMessage = "guest";
    this.redux.getState().connectedUser = this.connectedCustomer;
  }

  // User Login
  public login(): void {
    let date = new Date;
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    let fullDate = month + "-" + day + "-" + year;
    localStorage.setItem('date', JSON.stringify(fullDate));

    this.isConnected = false;
    this.customers.map(customer => {
      if (customer.email === this.email && customer.password === this.password) {

        this.connectedCustomer = customer;
        this.isConnected = true;
        this.redux.getState().connectedUser = this.connectedCustomer;
        localStorage.setItem("user", JSON.stringify(customer));
        this.loginSuccess = "You are logged"
        this.welcomeMessage = this.connectedCustomer.firstName;
        this.redux.getState().connectedAdmin = undefined;
        localStorage.removeItem("admin");
      }

      // Admin Login
      else {

        this.managers.map(manager => {
          if (manager.email === this.email && manager.password === this.password) {
            this.isConnected = true;
            this.redux.getState().connectedAdmin = manager;
            localStorage.setItem("admin", JSON.stringify(manager));
            this.redux.getState().connectedUser = undefined;
            localStorage.removeItem("user");
            this.router.navigate(["/main"])
          }
        })
      }
    });

    if (this.isConnected === false) {
      this.loginError = "Your password or email is incorrect"
    }

    // Notification message to new customer
    if (this.connectedCustomer != undefined) {
      this.cartsService.getCartFromUser(this.connectedCustomer._id).subscribe(
        cart => {

          this.existingCart = cart;
          this.ordersService.getAllOrdersOfOneUser(this.connectedCustomer._id).subscribe(
            customerOrders => {
              this.ordersOfOneCustomer = customerOrders
              this.itemsService.getAllItemsOfOneCart(this.existingCart[0]._id).subscribe(
                items => {
                  this.itemsOfCart = items
                  if (this.itemsOfCart.length <= 1 && customerOrders.length >= 1) {
                    let orderDate = localStorage.getItem('orderDate');
                    this.customerNotification = "Your last purchase was on " + orderDate;
                  }

                  if (this.itemsOfCart.length >= 1) {
                    let date = localStorage.getItem('date');

                    this.customerNotification = "You have an open cart from " + date
                    this.shoppingMessage = "Continue to shop"
                  }
                  if (this.itemsOfCart.length < 1 && this.ordersOfOneCustomer.length < 1) {

                    this.customerNotification = "Welcome to your first groceries"
                    this.shoppingMessage = "Start to shop"
                  }
                },
                err => console.log(err)
              )
            }
          )

        }
      )
    }
  }

  // Redirect Customer to main page after being logged
  public startShopping() {
    this.router.navigate(["/main"])
  }
}






