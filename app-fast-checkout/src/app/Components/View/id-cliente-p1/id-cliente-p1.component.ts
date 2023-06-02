import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
export class IdClienteP1Component implements OnInit {
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

  ngOnInit(): void {
    // this.dataService.contractAccount$.push(JSON.parse(this.localStorageService.getItem('contractAccount')));
    this.localStorageService.clear();
  }

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
                this.localStorageService.clear();
                this.localStorageService.setItem('contractAccount', JSON.stringify(data));
                this.router.navigate(['idClienteInstalacao']);
                // this.dataService.contractAccount$.push(data);
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
