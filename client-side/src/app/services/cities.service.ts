import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private httpClient: HttpClient) { }

  public getAllCities(): Observable<City[]> {
    return this.httpClient.get<City[]>("http://localhost:3000/api/cities");
  }
}



