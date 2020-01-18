import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/models/item';
import { Cart } from 'src/app/models/cart';
import { CartsService } from 'src/app/services/carts.service';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { ActionType } from 'src/app/redux/actionType';
import { Customer } from 'src/app/models/customer';
import { Manager } from 'src/app/models/manager';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.css']
})
export class ProductsCardComponent implements OnInit {

  @Input() product: Product;
  @Input() cart: Cart;
  public quantity: number = 1;
  public item: Item;
  public items: Item[];
  public newQuantity: number = 1;
  public exist: boolean = false;
  public totalPrice: number = 0;
  public connectedAdmin: Manager;
  public connectedCustomer: Customer;
  public display: boolean;
  public class: string = "";

  constructor(private itemsService: ItemsService,
    private redux: NgRedux<AppState>) { }

  ngOnInit() {

    this.connectedCustomer = this.redux.getState().connectedUser;
    this.connectedAdmin = this.redux.getState().connectedAdmin;

    if (this.connectedCustomer === undefined && this.connectedAdmin === undefined) {
      let localAdmin = localStorage.getItem("admin");
      if (localAdmin) {
        this.connectedAdmin = JSON.parse(localAdmin);
        this.class = "admin";
      }
      let local = localStorage.getItem("user");
      if (local) {
        this.connectedCustomer = JSON.parse(local)
        this.class = "card"
      }
    }

    if (this.connectedAdmin) {
      this.class = "admin";
    }
    else {
      this.class = "card";
    }

    if (this.cart) {
      this.itemsService.getAllItemsOfOneCart(this.cart[0]._id).subscribe(allItems => {
        this.items = allItems;

      })
    }
  }
  public decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  public increaseQuantity(): void {
    this.quantity += 1;
  }

  // By clicking on the card, the admin will see the update form
  public updateCard() {
    if (this.connectedAdmin) {
      this.redux.getState().productToUpdate = this.product;
      this.redux.getState().display = false;
    }
  }

  // check if the product already exists in customer Cart
  public checkIfExist(): any {
    for (let i = 0; i < this.items.length; i++) {
      if (this.product._id === this.items[i].productID._id) {
        this.exist = true;
        let updatedItem = {
          _id: this.items[i]._id,
          productID: this.product,
          amount: this.items[i].amount + this.quantity,
          totalPrice: this.items[i].totalPrice + (this.quantity * this.product.price),
          cartID: this.cart[0]
        }
        this.itemsService.updateCart(updatedItem._id, updatedItem).subscribe(() => {
          this.redux.getState().items[i].amount = updatedItem.amount;
          this.redux.getState().items[i].totalPrice = updatedItem.totalPrice;
          this.redux.getState().finalPrice += this.quantity * this.product.price
        }
        )
      }
    }
  }

  public addToCart() {
    this.exist = false;
    // if product already exists, only the quantity will be updated in the cart
    if (this.redux.getState().items.length > 0) {
      this.items = this.redux.getState().items;
      this.checkIfExist();
    }

    // if product doesn't exist, it will be added to the cart 
    if (this.cart && this.exist === false) {
      const newCartItem = {
        productID: this.product._id,
        amount: this.quantity,
        totalPrice: this.quantity * this.product.price,
        cartID: this.cart[0]._id
      }
      this.itemsService.addToCart(newCartItem).subscribe(() => {
        this.itemsService.getAllItemsOfOneCart(this.cart[0]._id).subscribe(cartItem => {
          const lastItem = cartItem[cartItem.length - 1];
          const action = { type: ActionType.addItemTocart, lastItem };
          this.redux.dispatch(action);
          this.redux.getState().items[cartItem.length - 1] = lastItem;
          this.redux.getState().finalPrice += lastItem.totalPrice;
        });
      });
    }
  }
}
