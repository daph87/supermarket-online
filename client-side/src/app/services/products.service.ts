import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) { }

  public getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:3000/api/products");
  }

  public getMilkAndEggsProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:3000/api/products/categories/5dda80f66abf9bee41fa8de6");
  }

  public getBathroomsProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:3000/api/products/categories/5dda81096abf9bee41fa8deb");
  }

  public getFruitsProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:3000/api/products/categories/5dc9491f9169c6d98b8e5a6b");

  }

  public getVegetablesProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:3000/api/products/categories/5dc97bdf9169c6d98b8e8b80");
  }
  public postImage(image): any {
    return this.httpClient.post("http://localhost:3000/upload-image", image);
  }

  public patchImage(image): any {
    return this.httpClient.patch("http://localhost:3000/update-image-name", image);
  }

  public getAlcoholProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>("http://localhost:3000/api/products/categories/5dda81206abf9bee41fa8df2");
  }

  public updateProduct(productID, product): Observable<Product> {
    return this.httpClient.put<Product>("http://localhost:3000/api/products/" + productID, product);
  }

  public getOneProduct(productID): Observable<Product> {
    return this.httpClient.get<Product>("http://localhost:3000/api/products/" + productID);
  }

}
