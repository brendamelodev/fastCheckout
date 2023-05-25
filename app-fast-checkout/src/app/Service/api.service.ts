import { ContractAccount, Invoice } from './../Models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private readonly baseURL = 'http://localhost:3001/'
  private readonly urlContract = 'http://localhost:3001/contract-account'
  private readonly urlInvoices = 'http://localhost:3001/invoices'

  constructor(private http: HttpClient) { }

  getContractAccount(contract: string, document: string): Observable<ContractAccount> {
    const params = new HttpParams().set("contract", contract).set("document", document);
    return this.http.get<ContractAccount>(this.urlContract, { params })
  }

  getInvoices(accountContractId: string): Observable<Invoice> {
    const params = new HttpParams().set("contract", accountContractId);
    return this.http.get<Invoice>(this.urlInvoices, { params })
  }

  getInvoiceById(invoiceId: string): Observable<Invoice> {
    const params = new HttpParams().set("invoiceId", invoiceId);
    return this.http.get<Invoice>(this.urlInvoices, { params })
  }
}
