import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription} from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { DataService } from 'src/app/Service/data.service';

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

  constructor(private dataService: DataService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.dataService.dataAccountContract$.subscribe(data => {
      this.accountContract = data;
    });
    this.getInvoices();
  }

  getInvoices() {
    this.subscription = this.apiService.getInvoices(this.accountContract).subscribe(
      { next: data => this.invoices = data });
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
    this.router.navigateByUrl('/faturas');
  }
}
