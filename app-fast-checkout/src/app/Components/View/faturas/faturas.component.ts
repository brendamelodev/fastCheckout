import { Component, OnInit } from '@angular/core';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { DataService } from 'src/app/Service/data.service';

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
  msgErro = '';

  constructor(private dataService: DataService, private apiService: ApiService) { }

  ngOnInit() {
    this.invoiceId = this.dataService.getInvoiceId();
    this.accountContract = this.dataService.getAccountContract();
    console.log(this.invoiceId);
    this.getInvoiceById();
  }

  getInvoiceById() {
    if (this.invoiceId != null && this.invoiceId != undefined) {
      this.subscription = this.apiService.getInvoiceById(this.invoiceId).subscribe(
        { next: data => {this.invoiceById = data; console.log(data);
         }});
    }
    else {
      console.log("Ops! Ocorreu um erro.");
    }
  }

}
