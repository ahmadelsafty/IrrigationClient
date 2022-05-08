import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private baseUrl = 'http://localhost:8080/irrigation-server/config';

  constructor(private http: HttpClient) { }

  getConfigData(): Observable<any> {
    return this.http.get(`${this.baseUrl}`+'/get');
  }

  updateConfigData(value: any): Observable<any> {
    return this.http.put(`${this.baseUrl}`+'/update', value);
  }

}
