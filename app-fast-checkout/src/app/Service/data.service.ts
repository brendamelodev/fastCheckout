import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private accountContract?: any;
  private invoices?: any;
  private invoiceId?: string;
  private invoiceById?: any;
  private totalAmount: number = 0;
  // Cria um objeto observável que compartilha os dados entre os componentes
  private dataAccountContractSubject = new BehaviorSubject<any>(null);
  // Cria um Observable somente leitura para os componentes se inscreverem
  public dataAccountContract$ = this.dataAccountContractSubject.asObservable();

  constructor() { }

  setAccountContract(data: any) {
    return this.accountContract = data;
  }
  getAccountContract() {
    return this.accountContract;
  }

  setInvoices(data: any) {
    return this.invoices = data;
  }
  getInvoices() {
    return this.invoices;
  }

  setInvoiceId(data: any) {
    return this.invoiceId = data;
  }
  getInvoiceId() {
    return this.invoiceId;
  }

  setInvoiceById(data: any) {
    return this.invoiceById = data;
  }
  getInvoiceById() {
    return this.invoiceById;
  }

  setTotalAmount(value: number) {
    this.totalAmount = value;
  }
  getTotalAmount(): number {
    return this.totalAmount;
  }

  // Define um método para atualizar os dados do objeto observável
  setDataAccountContract(data: any) {
    this.dataAccountContractSubject.next(data);
    this.setAccountContract(data);
  }
}
