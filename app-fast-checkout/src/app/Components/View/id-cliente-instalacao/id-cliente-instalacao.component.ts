import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { ContractAccount, Invoice } from 'src/app/Models/interfaces';
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

  constructor(private dataService: DataService, private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.dataService.dataAccountContract$.subscribe(data => {
      this.accountContract = data;
    });

    this.getInvoices();
  }

  getInvoices() {
    this.subscription = this.apiService.getInvoices(this.accountContract)
      .pipe(
        catchError(() => {
          this.msgErro = 'Ops, ocorreu um erro.'
          return EMPTY
        })
      )
      .subscribe(
        {
          next: data => {
            if (Object.keys(data).length === 0) {
              this.msgErro = 'Ops, ocorreu um erro. Seu cadastro não foi encontrado!';
            } else {
              this.invoices = data;
            }
          }
        }
      );
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }
}
