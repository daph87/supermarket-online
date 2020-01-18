import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private httpClient: HttpClient) { }

  public getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>("http://localhost:3000/api/customers");
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.httpClient.post<Customer>("http://localhost:3000/api/customers", customer);
  }

  public getOneCustomer(customerID): Observable<Customer> {
    return this.httpClient.get<Customer>("http://localhost:3000/api/customers/" + customerID);
  }
}

