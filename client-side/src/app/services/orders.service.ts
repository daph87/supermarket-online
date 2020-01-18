import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../models/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient: HttpClient) { }

  public addOrder(order: Order): Observable<Order> {

    return this.httpClient.post<Order>("http://localhost:3000/api/orders", order)

  }

  public getAllOrders(): Observable<Order[]> {
    return this.httpClient.get<Order[]>("http://localhost:3000/api/orders")
  }

  public getAllOrdersOfOneUser(userID): Observable<Order[]> {
    return this.httpClient.get<Order[]>("http://localhost:3000/api/orders/customers/" + userID)
  }
}
