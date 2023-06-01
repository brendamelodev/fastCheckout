import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, Subscription, catchError } from 'rxjs';
import { ContractAccount } from 'src/app/Models/interfaces';
import { ApiService } from 'src/app/Service/api.service';
import { DataService } from 'src/app/Service/data.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';

@Component({
  selector: 'app-id-cliente-p1',
  templateUrl: './id-cliente-p1.component.html',
  styleUrls: ['./id-cliente-p1.component.scss']
})
export class IdClienteP1Component {
  contractAccount!: ContractAccount;
  subscription?: Subscription;
  cpf: string = '';
  msgErro = '';

  constructor(
    private viewportScroller: ViewportScroller,
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private localStorageService: LocalStorageService
    ) { }

  form: FormGroup = this.fb.group({
    document: ['', [Validators.required, Validators.minLength(11)]],
    contract: ['', [Validators.required, Validators.minLength(9)]]
  });

  scrollToDiv() {
    this.viewportScroller.scrollToAnchor('componentRef');
  }

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
            next: data => {
              if (Object.keys(data).length === 0) {
                this.msgErro = 'Ops, ocorreu um erro. Seu cadastro não foi encontrado!';
              } else {
                this.contractAccount = data;
                this.dataService.setDataAccountContract(data);
                this.router.navigate(['idClienteInstalacao']);
                if (this.localStorageService.getAll() >= 2) {
                  this.localStorageService.clear();
                  console.log('zerou');
                } else {
                  this.localStorageService.setItem('contractAccount', JSON.stringify(data));
                  console.log(JSON.parse(this.localStorageService.getItem('contractAccount')));

                }
              }
            }
          }
        );
    }
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  clearMsgErro() {
    this.msgErro = '';
  }
}
