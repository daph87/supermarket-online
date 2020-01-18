import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { Item } from '../models/item';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private httpClient: HttpClient, private redux: NgRedux<AppState>) { }

  public addToCart(item: Item): Observable<Item> {
    return this.httpClient.post<Item>("http://localhost:3000/api/items", item)
  }

  public getAllItemsOfOneCart(id): Observable<Item[]> {
    return this.httpClient.get<Item[]>("http://localhost:3000/api/items/" + id);
  }
  public updateCart(item_id, item): Observable<Item> {
    return this.httpClient.patch<Item>("http://localhost:3000/api/items/" + item_id, item);
  }

  public deleteItems(cartID): Observable<Item> {
    return this.httpClient.delete<Item>("http://localhost:3000/api/items/carts/" + cartID)
  }

  public deleteItem(itemID): Observable<Item> {
    return this.httpClient.delete<Item>("http://localhost:3000/api/items/" + itemID)
  }
}


