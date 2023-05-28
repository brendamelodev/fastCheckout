import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit{
  subscription?: Subscription;
  selectedPaymentType: string = 'Cartão de Crédito';
  accountContract!: any;
  invoiceById?: any;
  totalAmount: number = 0;
  installments?: any;
  selectedInstallment: any;
  paymentTypes = [
    { classIcon: 'bi bi-credit-card', type: 'Cartão de Crédito', description: 'Em até 21 vezes' },
    { classIcon: 'bi bi-cash-coin', type: 'Cartão de Débito Virtual Caixa', description: 'Bolsa Família' },
    { classIcon: 'bi bi-x-diamond-fill', type: 'Pagamento Instantâneo', description: 'PIX' }
  ];

  constructor(private dataService: DataService, private fb: FormBuilder, private apiService: ApiService) { }

  form: FormGroup = this.fb.group({
    cartao: ['', [Validators.required, Validators.minLength(11)]],
    nameCartao: ['', [Validators.required, Validators.minLength(9)]],
    validade: ['', Validators.required],
    cvc: ['', Validators.required],
    cep: ['', Validators.required]
  });

  ngOnInit() {
    this.totalAmount = this.dataService.getTotalAmount();
    this.invoiceById = this.dataService.getInvoiceById();
    this.dataService.dataAccountContract$.subscribe(data => {
      this.accountContract = data;
    });
    this.getInstallments();
  }

  selectPaymentType(type: string) {
    this.selectedPaymentType = type;
  }

  getClassIcon(paymentType: string): string {
    let icon = "";
    if (paymentType === "Cartão de Crédito") {
      icon = "bi bi-credit-card";
    } else if (paymentType === "Cartão de Débito Virtual Caixa") {
      icon = "bi bi-cash-coin";
    } else if (paymentType === "Pagamento Instantâneo") {
      icon = "bi bi-x-diamond-fill";
    } else {
      icon = "bi bi-question";
    }
    return icon;
  }

  getDescription(paymentType: string): string {
    let description = "";
    if (paymentType === "Cartão de Crédito") {
      description = "Em até 21 vezes";
    } else if (paymentType === "Cartão de Débito Virtual Caixa") {
      description = "Bolsa Família";
    } else if (paymentType === "Pagamento Instantâneo") {
      description = "PIX";
    } else {
      description = "Descrição não disponível";
    }
    return description;
  }

  getInstallments() {
    this.subscription = this.apiService.getInstallments().subscribe(
      { next: data => this.installments = data
      });
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  updateSelectedInstallment(value: any, key: any) {
    this.selectedInstallment = { key, value };
  }

  sortedKeys(obj: any): string[] {
    return Object.keys(obj).sort((a, b) => parseInt(a) - parseInt(b));
  }
}
