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
export class PagamentoComponent implements OnInit {
  subscription?: Subscription;
  selectedPaymentType: string = 'Cartão de Crédito';
  accountContract!: any;
  invoiceById?: any;
  totalAmount: number = 0;
  installments?: any;
  selectedInstallment: any;
  msgErrorValidade = '';
  cardIcon: string = '';
  textCard: string = '';
  validade: boolean = false;
  paymentTypes = [
    { classIcon: 'bi bi-credit-card', type: 'Cartão de Crédito', description: 'Em até 21 vezes' },
    { classIcon: 'bi bi-cash-coin', type: 'Cartão de Débito Virtual Caixa', description: 'Bolsa Família' },
    { classIcon: 'bi bi-x-diamond-fill', type: 'Pagamento Instantâneo', description: 'PIX' }
  ];

  constructor(private dataService: DataService, private fb: FormBuilder, private apiService: ApiService) { }

  form: FormGroup = this.fb.group({
    cartao: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(17)]],
    nameCartao: ['', [Validators.required, Validators.minLength(3)]],
    validade: ['', [Validators.required]],
    cvc: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(4)]],
    cep: ['', [Validators.required, Validators.minLength(8)]],
    name: ['', [Validators.required]],
    email: ['', Validators.required],
    telefone: ['', Validators.required]
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
      {
        next: data => this.installments = data
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

  validateCardNumber(cardNumber: string) {

    if (cardNumber.startsWith('4')) {
      this.cardIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png';
      this.textCard = 'Visa';
    } else if (['51', '52', '53', '54', '55'].some(prefix => cardNumber.startsWith(prefix))) {
      this.cardIcon = 'https://cdn.icon-icons.com/icons2/2342/PNG/512/mastercard_payment_method_icon_142750.png';
      this.textCard = 'Mastercard';
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
    console.log(dateNow)

    const dateAtual = new Date(Number(parts[2].slice(0, 2)) + dateNow.slice(3) + "-" + dateNow.slice(0, 2) + "-01");
    console.log(dateAtual)

    if (control.length == 4) {
      const dataInput = `${control.substr(0, 2)}/${control.substr(2, 2)}`;

      const dateDigitado = new Date(Number(parts[2].slice(0, 2)) + dataInput.slice(3) + "-" + dataInput.slice(0, 2) + "-01");
      console.log(dateDigitado)

      if (dateDigitado < dateAtual || control.length < 4) {
        this.validade = true;
        console.log('data invalida');
      } else {
        this.validade = false;
        console.log('deu bom');
      }
    }
  }
}
