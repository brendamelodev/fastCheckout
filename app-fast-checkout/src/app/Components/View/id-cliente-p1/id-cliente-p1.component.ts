import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError, map } from 'rxjs';
import { ContractAccount } from 'src/app/Models/interfaces';
import { ApiService } from 'src/app/Service/api.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-id-cliente-p1',
  templateUrl: './id-cliente-p1.component.html',
  styleUrls: ['./id-cliente-p1.component.scss']
})
export class IdClienteP1Component {
  contractAccount!: ContractAccount;
  subscription?: Subscription;
  msgErro = '';

  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router, private dataService: DataService) { }

  form: FormGroup = this.fb.group({
    document: ['', [Validators.required, Validators.minLength(11)]],
    contract: ['', [Validators.required, Validators.minLength(9)]]
  });

  getContractAccount() {
    if (this.form.valid) {
      this.subscription = this.apiService.getContractAccount(this.form.value['contract'], this.form.value['document'])
        .pipe(
          catchError(() => {
            this.msgErro = 'Ops, ocorreu um erro.'
            return EMPTY
          })
        )
        .subscribe(
          {
            // next: data => this.contractAccount = data
            next: data => {
              if (Object.keys(data).length === 0) {
                this.msgErro = 'Ops, ocorreu um erro. Seu cadastro não foi encontrado!';
              } else {
                this.contractAccount = data;
                this.dataService.setData(data);
              }
            }
          }
        );
      this.router.navigateByUrl('/idClienteInstalacao');
    }
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

}
