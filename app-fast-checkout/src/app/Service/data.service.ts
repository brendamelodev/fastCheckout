import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  accountContract: any;
  invoices: any;

  // Cria um objeto observável que compartilha os dados entre os componentes
  private dataAccountContract = new BehaviorSubject<any>(null);
  private dataInvoices = new BehaviorSubject<any>(null);

  // Cria um Observable somente leitura para os componentes se inscreverem
  public dataAccountContract$ = this.dataAccountContract.asObservable();
  public dataInvoices$ = this.dataInvoices.asObservable();

  constructor() { }

  setTeste(data: any) {
    this.accountContract = data;
  }

  // Define um método para atualizar os dados do objeto observável
  setDataAccountContract(data: any) {
    this.dataAccountContract.next(data);
  }
  setDataInvoices(data: any) {
    this.dataInvoices.next(data);
  }
}
