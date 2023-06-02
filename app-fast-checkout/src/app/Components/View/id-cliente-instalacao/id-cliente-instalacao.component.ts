import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { DataService } from 'src/app/Service/data.service';
import { LoadingService } from 'src/app/Service/loading.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';

@Component({
  selector: 'app-id-cliente-instalacao',
  templateUrl: './id-cliente-instalacao.component.html',
  styleUrls: ['./id-cliente-instalacao.component.scss']
})
export class IdClienteInstalacaoComponent implements OnInit {
  subscription?: Subscription;
  accountContractStorage: any;
  invoicesStorage: any;
  invoiceIdStorage: any;
  msgErro = '';

  constructor(private apiService: ApiService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getInvoices();
    this.accountContractStorage = JSON.parse(this.localStorageService.getItem('contractAccount'));
    this.invoicesStorage = JSON.parse(this.localStorageService.getItem('invoices'));
  }

  getInvoices() {
    this.subscription = this.apiService.getInvoices(this.accountContractStorage).subscribe(
      {
        next: data => {
          this.localStorageService.setItem('invoices', JSON.stringify(data));
          this.invoicesStorage = JSON.parse(this.localStorageService.getItem('invoices'));
        }
      });
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  setsInvoiceId(data: any) {
    this.localStorageService.setItem('invoiceId', JSON.stringify(data));
    this.invoiceIdStorage = JSON.parse(this.localStorageService.getItem('invoiceId'));
    this.getInvoiceById();
    setTimeout(() => {
      this.router.navigateByUrl('/faturas');
    }, 50);
  }

  getInvoiceById() {
    if (this.invoiceIdStorage) {
      this.subscription = this.apiService.getInvoiceById(this.invoiceIdStorage).subscribe(
        {
          next: data => {
            this.localStorageService.setItem('invoiceById', JSON.stringify(data));
            console.log('pegou');
          }
        });
    }
    else {
      console.log("Ops! Ocorreu um erro.");
    }
  }
}
