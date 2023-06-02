import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/Service/api.service';
import { LocalStorageService } from 'src/app/Service/local-storage.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit {
  subscription?: Subscription;
  selectedPaymentType: string = 'Cartão de Crédito';
  msgErrorValidade = '';
  cardIcon: string = '';
  textCard: string = '';
  validade: boolean = false;
  paymentTypes = [
    { classIcon: 'bi bi-credit-card', type: 'Cartão de Crédito', description: 'Em até 21 vezes' },
    { classIcon: 'bi bi-cash-coin', type: 'Cartão de Débito Virtual Caixa', description: 'Bolsa Família' },
    { classIcon: 'bi bi-x-diamond-fill', type: 'Pagamento Instantâneo', description: 'PIX' }
  ];
  accountContractStorage: any;
  invoiceByIdStorage: any;
  totalAmountStorage: any;
  installmentsStorage: any;
  selectedInstallmentStorage: any;
  paymentStorage: any;
  brand: string = '';

  constructor(private localStorageService: LocalStorageService, private fb: FormBuilder, private router: Router, private apiService: ApiService) { }

  form: FormGroup = this.fb.group({
    cartao: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(17)]],
    nameCartao: ['', [Validators.required, Validators.minLength(3)]],
    validade: ['', [Validators.required]],
    cvc: ['', [Validators.required]],
    cep: ['', [Validators.required, Validators.minLength(8)]],
    name: ['', [Validators.required]],
    email: ['', Validators.required],
    telefone: ['', Validators.required]
  });

  ngOnInit() {
    this.accountContractStorage = JSON.parse(this.localStorageService.getItem('contractAccount'));
    this.invoiceByIdStorage = JSON.parse(this.localStorageService.getItem('invoiceById'));
    this.totalAmountStorage = JSON.parse(this.localStorageService.getItem('totalAmount'));
    this.installmentsStorage = JSON.parse(this.localStorageService.getItem('installments'));
    this.paymentStorage = JSON.parse(this.localStorageService.getItem('payment'));
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

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = undefined;
    }
  }

  updateSelectedInstallment(value: any, key: any) {
    // this.selectedInstallment = { key, value };
    this.localStorageService.setItem(key, JSON.stringify({ value }));
    this.selectedInstallmentStorage = JSON.parse(this.localStorageService.getItem(key));
  }

  sortedKeys(obj: any): string[] {
    return Object.keys(obj).sort((a, b) => parseInt(a) - parseInt(b));
  }

  validateCardNumber(cardNumber: string) {

    if (cardNumber.startsWith('4')) {
      this.cardIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png';
      this.textCard = 'Visa';
    } else if (['51', '52', '53', '54', '55'].some(prefix => cardNumber.startsWith(prefix))) {
      this.cardIcon = 'https://cdn.icon-icons.com/icons2/2342/PNG/512/mastercard_payment_method_icon_142750.png';
      this.textCard = 'Mastercard';
      this.brand = 'MASTER';
    } else if (['34', '37'].some(prefix => cardNumber.startsWith(prefix))) {
      this.cardIcon = 'https://cdn-icons-png.flaticon.com/512/349/349228.png';
      this.textCard = 'American Express';
    } else if (cardNumber.startsWith('38')) {
      if (cardNumber.length > 14) {
        this.cardIcon = 'https://seeklogo.com/images/H/hipercard-logo-24ACB8E6BE-seeklogo.com.png';
        this.textCard = 'Hipercard';
      } else {
        this.cardIcon = 'https://cdn-icons-png.flaticon.com/512/196/196548.png';
        this.textCard = 'Diners';
      }
    } else if (['36', '300', '301', '302', '303', '305'].some(prefix => cardNumber.startsWith(prefix))) {
      this.cardIcon = 'https://cdn-icons-png.flaticon.com/512/196/196548.png';
      this.textCard = 'Diners';
    } else if (['636368', '438935', '504175', '451416', '636297', '5067', '4576', '4011', '506699'].some(prefix => cardNumber.startsWith(prefix))) {
      this.cardIcon = 'https://logodownload.org/wp-content/uploads/2017/04/elo-logo-1-1.png';
      this.textCard = 'Elo';
    } else if (cardNumber.startsWith('60')) {
      this.cardIcon = 'https://seeklogo.com/images/H/hipercard-logo-24ACB8E6BE-seeklogo.com.png';
      this.textCard = 'Hipercard';
    } else {
      this.cardIcon = 'https://cdn.icon-icons.com/icons2/2072/PNG/512/card_credit_internet_lock_locked_padlock_security_icon_127043.png';
      this.textCard = 'Cartão Inválido';
    }
  }

  validateCardValidade(control: any) {
    const date = new Date(Date.now());
    const formatDate = date.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const parts = formatDate.split("-");
    const dateNow = `${parts[1]}/${parts[2].slice(-2)}`;

    const dateAtual = new Date(Number(parts[2].slice(0, 2)) + dateNow.slice(3) + "-" + dateNow.slice(0, 2) + "-01");

    if (control.length == 4) {
      const dataInput = `${control.substr(0, 2)}/${control.substr(2, 2)}`;

      const dateDigitado = new Date(Number(parts[2].slice(0, 2)) + dataInput.slice(3) + "-" + dataInput.slice(0, 2) + "-01");

      if (dateDigitado < dateAtual || control.length < 4) {
        this.validade = true;
      } else {
        this.validade = false;
      }
    }
  }

  onFormSubmit() {
    // const form = {
    //   card_number: '5151515151551515',
    //   holder: 'teste',
    //   brand: 'MASTER',
    //   expiration_date: '10/2029',
    //   security_code: '123'
    // };
    const date = new Date(Date.now());
    const formatDate = moment(date).format('L')
    const parts = formatDate.split("/");
    const twoFirstYear = parts[2].slice(0, 2);

    const control = this.form.controls['validade'].value
    const validade = (control.slice(0, 2) + "/" + twoFirstYear + control.slice(-2)).toString()

    const dados = {
      card_number: this.form.controls['cartao'].value,
      holder: this.form.controls['nameCartao'].value,
      brand: this.brand,
      expiration_date: validade
      // security_code: this.form.controls['cvc'].value
    };

    if (
      this.paymentStorage.card_number == dados.card_number &&
      this.paymentStorage.holder == dados.holder &&
      this.paymentStorage.brand == dados.brand &&
      this.paymentStorage.expiration_date == dados.expiration_date
      // this.paymentStorage.security_code == dados.security_code
    ) {
      this.localStorageService.setItem('formulario', JSON.stringify(this.form.value));
      console.log(JSON.parse(this.localStorageService.getItem('formulario')));
      console.log('deu bom');

      // this.router.navigateByUrl('/approved-transaction');
    } else {
      console.log('deu ruim');

      // this.router.navigateByUrl('/unauthorized-transaction');
    }
    // setTimeout(() => {
    // }, 50);
  }

}
