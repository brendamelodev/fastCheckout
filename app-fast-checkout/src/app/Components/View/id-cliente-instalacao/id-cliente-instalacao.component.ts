import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { DataService } from 'src/app/Service/data.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';

@Component({
  selector: 'app-id-cliente-instalacao',
  templateUrl: './id-cliente-instalacao.component.html',
  styleUrls: ['./id-cliente-instalacao.component.scss']
})
export class IdClienteInstalacaoComponent implements OnInit {
  accountContract!: any;
  invoices!: any;
  subscription?: Subscription;
  msgErro = '';
  invoiceId?: string;
  accountContractStorage: any;
  invoicesStorage: any;
  invoiceIdStorage: any;

  constructor(private dataService: DataService, private apiService: ApiService, private router: Router, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.dataService.dataAccountContract$.subscribe(data => {
      this.accountContract = data;
    });

    this.getInvoices();

    this.accountContractStorage = JSON.parse(this.localStorageService.getItem('contractAccount'));
    // console.log(this.accountContractStorage[0]?.document);
  }

  getInvoices() {
    this.subscription = this.apiService.getInvoices(this.accountContract).subscribe(
      {
        next: data => {
          this.invoices = data;
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
    this.invoiceId = data;
    this.dataService.setInvoiceId(data);
    this.localStorageService.setItem('invoiceId', JSON.stringify(data));
    this.invoiceIdStorage = JSON.parse(this.localStorageService.getItem('invoiceId'));
    this.router.navigateByUrl('/faturas');
  }

  clearStorage() {
    this.localStorageService.clear();
    this.router.navigate(['idClienteP1']);
  }
}
