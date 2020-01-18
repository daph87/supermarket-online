import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Cart } from 'src/app/models/cart';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { ActionType } from 'src/app/redux/actionType';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() user: Customer;
  @Input() cart: Cart;
  public items: Item[];
  public finalPrice: number = 0;
  public currentHour: Date;


  constructor(private router: Router, public redux: NgRedux<AppState>, private itemsService: ItemsService) { }


  ngOnInit() {

    this.itemsService.getAllItemsOfOneCart(this.cart[0]._id).subscribe(allItems => {
      this.items = allItems;
      this.redux.getState().items = this.items;
      allItems.map(item => {
        this.finalPrice += item.totalPrice;
        this.redux.getState().finalPrice = this.finalPrice;
      })
    })
  }

  // Logout Function 
  public logOut(): void {
    this.redux.getState().connectedUser = undefined;
    localStorage.removeItem("user");
    this.router.navigate(["/home"])
  }

  // Delete All Items Button
  public deleteItems(): void {
    if (confirm("Are you sure that you want to delete all the items ?")) {
      this.itemsService
        .deleteItems(this.cart[0]._id)
        .subscribe(
          () => {
            const action = { type: ActionType.deleteAllItemsFromCart, payload: this.items };
            this.redux.dispatch(action);
            this.redux.getState().finalPrice = 0;
            this.finalPrice = this.redux.getState().finalPrice
          })
    }
  }

  // Redirect to Order Page
  public order(): void {
    this.router.navigate(["/orders"])
  }
}
