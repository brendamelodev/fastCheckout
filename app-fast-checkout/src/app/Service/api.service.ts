import { ContractAccount, Installments, Invoice } from './../Models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // private readonly baseURL = 'http://localhost:3001/'
  private readonly urlContract = 'http://localhost:3001/contract-account'
  private readonly urlInvoices = 'http://localhost:3001/invoices'
  private readonly urlInstallments = 'http://localhost:3001/installments'
  private readonly urlPayment = 'http://localhost:3001/payment'

  constructor(private http: HttpClient) { }

  getContractAccount(contract: string, document: string): Observable<ContractAccount> {
    const params = new HttpParams().set("contract", contract).set("document", document);
    return this.http.get<ContractAccount>(this.urlContract, { params });
  }

  getInvoices(accountContractId: string): Observable<Invoice> {
    const params = new HttpParams().set("contract", accountContractId);
    return this.http.get<Invoice>(this.urlInvoices, { params });
  }

  getInvoiceById(invoiceId: string): Observable<Invoice> {
    const params = new HttpParams().set("invoiceId", invoiceId);
    return this.http.get<Invoice>(this.urlInvoices, { params });
  }

  getInstallments(): Observable<Installments> {
    return this.http.get<Installments>(this.urlInstallments);
  }

  postPayment(formValues: any): Observable<any> {
    const params = new HttpParams().set("card_request", formValues);
    return this.http.post(this.urlPayment, { params });
  }

  getPayment(): Observable<any> {
// cardNumber: string, holder: string, brand: string, expirationDate: string, securityCode: string
    return this.http.get<any>(this.urlPayment)
      .pipe(
        map(response => response[0].card_request)
          // filter(payment => payment.cardNumber === cardNumber &&
          //   payment.holder === holder &&
          //   payment.brand === brand &&
          //   payment.expirationDate === expirationDate &&
          //   payment.securityCode === securityCode)
      );

  }
}
