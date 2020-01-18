import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { CartsService } from 'src/app/services/carts.service';
import { Cart } from 'src/app/models/cart';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/models/city';
import { ManagersService } from 'src/app/services/managers.service';
import { Manager } from 'src/app/models/manager';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public customer = new Customer();
  public customers: Customer[];
  public existingUser: string;
  public passwordConfirmed: string;
  public passwordMessage: string;
  public cart = new Cart();
  public cities: City[];
  public managers: Manager[];


  constructor(private customersService: CustomersService, private managersService: ManagersService, private citiesServices: CitiesService, private router: Router, private redux: NgRedux<AppState>, private cartsService: CartsService) { }

  ngOnInit() {
    this.customersService.getAllCustomers().subscribe(allCustomers => {
      this.customers = allCustomers;
    });
    this.citiesServices.getAllCities().subscribe(allCities => {
      this.cities = allCities;
    });
    this.managersService.getAllManagers().subscribe(allManagers => {
      this.managers = allManagers;
    })

  }

  // Add new customer to the dataBase
  public addCustomer() {
    this.customersService.addCustomer(this.customer)
      .subscribe(customer => {
        localStorage.setItem("user", JSON.stringify(customer));
        this.redux.getState().connectedUser = customer;
        alert("Welcome to supermarket " + customer.firstName);
        this.cart.customerID = customer._id;

        this.cart.creationDate = new Date();

        this.cartsService.addCart(this.cart).subscribe(() => {
          this.router.navigate(["/main"]);
        });
      },
        err => alert(err));
  }

  public backButton() {
    this.router.navigate(["/home"])
  }

  // Check if email already exists in the dataBase
  public existingEmail(): void {
    this.existingUser = "";
    this.customers.map(c => {
      if (c.email === this.customer.email) {
        this.existingUser = "This email is already in the system, please choose another one";
      }
    })
    this.managers.map(manager => {
      if (manager.email === this.customer.email) {
        this.existingUser = "This email is already in the system, please choose another one"
      }
    })

  }

  // Password's confirmation error
  public differentPassword(): void {

    this.passwordMessage = "";
    if (this.customer.password !== this.passwordConfirmed) {
      this.passwordMessage = "this password is not the same as the one entered";
    }
  }
}

