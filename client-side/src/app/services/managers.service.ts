import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  constructor(private httpClient: HttpClient) { }


  public getOneManager(managerID): Observable<Manager> {
    return this.httpClient.get<Manager>("http://localhost:3000/api/managers/" + managerID);
  }

  public getAllManagers(): Observable<Manager[]> {
    return this.httpClient.get<Manager[]>("http://localhost:3000/api/managers");
  }

}


