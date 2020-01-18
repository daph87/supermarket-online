import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient) { }

  public getOneCategory(categoryID): Observable<Category> {
    return this.httpClient.get<Category>("http://localhost:3000/api/categories/" + categoryID);
  }

  public getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>("http://localhost:3000/api/categories");
  }
}

