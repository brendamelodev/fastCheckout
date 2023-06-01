import { Component, OnInit } from '@angular/core';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { DataService } from 'src/app/Service/data.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.scss']
})
export class FaturasComponent implements OnInit {
  subscription?: Subscription;
  invoiceId?: any;
  invoiceById?: any;
  accountContract?: any;
  selectedInvoices: any[] = [];
  amount: any;
  msgErro = '';

  invoiceIdStorage: any;
  invoiceByIdStorage: any;
  accountContractStorage: any;
  totalAmountStorage: any;
  selectedInvoicesStorage: any[] = [];

  constructor(private dataService: DataService, private apiService: ApiService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.invoiceId = this.dataService.getInvoiceId();
    this.invoiceIdStorage = JSON.parse(this.localStorageService.getItem('invoiceId'));
    this.accountContract = this.dataService.getAccountContract();
    this.accountContractStorage = JSON.parse(this.localStorageService.getItem('contractAccount'));
    this.invoiceByIdStorage = JSON.parse(this.localStorageService.getItem('invoiceById'));
    console.log(this.invoiceByIdStorage);
    this.getInvoiceById();
  }

  getInvoiceById() {
    if (this.invoiceIdStorage != null && this.invoiceIdStorage != undefined) {
      this.subscription = this.apiService.getInvoiceById(this.invoiceId).subscribe(
        {
          next: data => {
            this.invoiceById = data; console.log(data);
            this.dataService.setInvoiceById(data);
            this.localStorageService.setItem('invoiceById', JSON.stringify(data));
          }
        });
    }
    else {
      console.log("Ops! Ocorreu um erro.");
    }
  }

  toggleInvoiceSelection(invoice: any) {
    const index = this.selectedInvoices.indexOf(invoice);
    // const index = this.selectedInvoicesStorage.indexOf(invoice);

    if (index !== -1) {
      this.selectedInvoices.splice(index, 1);
      this.localStorageService.removeItem(index.toString());
    } else {
      this.selectedInvoices.push(invoice);
      this.localStorageService.setItem('selectedInvoiceIndex', JSON.stringify(invoice));
      this.selectedInvoicesStorage = JSON.parse(this.localStorageService.getItem('selectedInvoiceIndex'));
    }
    invoice.selected = !invoice.selected;
  }

  toggleAllInvoiceSelection() {
    if (this.selectedInvoicesStorage.length === this.invoiceByIdStorage.length) {
      // this.selectedInvoices = [];
      // this.invoiceById.forEach((invoice: any) => {
      //   invoice.selected = false;
      // });
      this.selectedInvoicesStorage = [];
      this.invoiceByIdStorage.forEach((invoice: any) => {
        invoice.selected = false;
      });
    } else {
      // this.selectedInvoices = [...this.invoiceById];
      // this.invoiceById.forEach((invoice: any) => {
      //   invoice.selected = true;
      // });
      this.selectedInvoicesStorage = [...this.invoiceByIdStorage];
      this.invoiceByIdStorage.forEach((invoice: any) => {
        invoice.selected = true;
      });
    }
  }

  get btnSelectText(): string {
    return this.selectedInvoicesStorage.length === (this.invoiceByIdStorage?.length || 0) ? 'Desmarcar todos' : 'Marcar todos';
  }

  get totalAmount(): number {
    const amount = this.selectedInvoices.reduce((total, invoice) => total + invoice.amount, 0);
    this.dataService.setTotalAmount(amount);
    this.amount = this.dataService.getTotalAmount();
    this.localStorageService.setItem('totalAmount', JSON.stringify(amount));
    this.totalAmountStorage = JSON.parse(this.localStorageService.getItem('totalAmount'));
    return amount;
  }
}
