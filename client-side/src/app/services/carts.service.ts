import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private httpClient: HttpClient) { }

  public getCartFromUser(userID): Observable<Cart> {
    return this.httpClient.get<Cart>("http://localhost:3000/api/carts/" + userID);
  }

  public deleteCart(cartID): Observable<Cart> {
    return this.httpClient.delete<Cart>("http://localhost:3000/api/carts/" + cartID)
  }

  public addCart(cart: Cart): Observable<Cart> {
    return this.httpClient.post<Cart>("http://localhost:3000/api/carts", cart)
  }
}

