import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private readonly baseURL = 'http://localhost:3001/'
  private readonly urlContract = 'http://localhost:3001/contract-account'

  constructor(private http: HttpClient) { }

  getContractAccount(document: string): Observable<any> {
    const params = new HttpParams().set("document", document);
    return this.http.get<any>(this.urlContract, { params })
  }

  getInvoices() {
    return this.http.get<any>('http://localhost:3001/invoices');
  }
}
