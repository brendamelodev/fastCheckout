import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Service/local-storage.service';

@Component({
  selector: 'app-approved-transaction',
  templateUrl: './approved-transaction.component.html',
  styleUrls: ['./approved-transaction.component.scss']
})
export class ApprovedTransactionComponent implements OnInit {
  form: any;

  constructor (private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.form = JSON.parse(this.localStorageService.getItem('formulario'))
    console.log(this.form);
  }

}
