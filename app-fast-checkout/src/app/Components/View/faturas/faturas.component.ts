import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.scss']
})
export class FaturasComponent implements OnInit {
  subscription?: Subscription;
  selectedInvoices: any[] = [];
  msgErro = '';

  invoiceIdStorage: any;
  invoiceByIdStorage: any;
  accountContractStorage: any;
  totalAmountStorage: any;
  selectedInvoicesStorage: any[] = [];

  constructor(private localStorageService: LocalStorageService, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.invoiceIdStorage = JSON.parse(this.localStorageService.getItem('invoiceId'));
    this.accountContractStorage = JSON.parse(this.localStorageService.getItem('contractAccount'));
    this.invoiceByIdStorage = JSON.parse(this.localStorageService.getItem('invoiceById'));
  }

  toggleInvoiceSelection(invoice: any) {
    const index = this.selectedInvoices.indexOf(invoice);
    console.log(this.selectedInvoices);
    console.log(this.selectedInvoices.indexOf(invoice));


    if (index !== -1) {
      this.selectedInvoices.splice(index, 1);
      this.localStorageService.removeItem(invoice);
    } else {
      this.selectedInvoices.push(invoice);
      this.localStorageService.setItem('selectedInvoiceIndex', JSON.stringify(invoice));
      this.selectedInvoicesStorage = JSON.parse(this.localStorageService.getItem('selectedInvoiceIndex'));
    }
    invoice.selected = !invoice.selected;
  }

  toggleAllInvoiceSelection() {
    if (this.selectedInvoicesStorage.length === this.invoiceByIdStorage.length) {
      this.selectedInvoicesStorage = [];
      this.invoiceByIdStorage.forEach((invoice: any) => {
        invoice.selected = false;
      });
    } else {
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
    const invoicesArray = Object.values(this.selectedInvoicesStorage);
    const amount = invoicesArray.reduce((total, invoice) => total + invoice.amount, 0);

    this.localStorageService.setItem('totalAmount', JSON.stringify(amount));
    this.totalAmountStorage = JSON.parse(this.localStorageService.getItem('totalAmount'));
    return amount;
  }

  avancar() {
    this.getInstallments();
    this.getPayment()
    setTimeout(() => {
      this.router.navigateByUrl('/pagamento');
    }, 50);
  }

  getInstallments() {
    this.subscription = this.apiService.getInstallments().subscribe(
      {
        next: data => {
          this.localStorageService.setItem('installments', JSON.stringify(data));
        }
      });
  }

  getPayment() {
    this.apiService.getPayment().subscribe({
      next: data => {
        this.localStorageService.setItem('payment', JSON.stringify(data));
      },
      error: error => console.log(error)
    })
  }

}
