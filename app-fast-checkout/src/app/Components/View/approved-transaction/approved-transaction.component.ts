import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/Service/local-storage.service';

@Component({
  selector: 'app-approved-transaction',
  templateUrl: './approved-transaction.component.html',
  styleUrls: ['./approved-transaction.component.scss']
})
export class ApprovedTransactionComponent implements OnInit {
  form: any;
  cardIcon: string = 'https://cdn.icon-icons.com/icons2/2342/PNG/512/mastercard_payment_method_icon_142750.png';
  textCard: string = 'Mastercard';

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.form = JSON.parse(this.localStorageService.getItem('formulario'))
    console.log(this.form);
  }

  card() {
    switch (this.form.brand) {
      case 'VISA':
        this.cardIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png';
        this.textCard = 'Visa';
        break;
      case 'MASTER':
        this.cardIcon = 'https://cdn.icon-icons.com/icons2/2342/PNG/512/mastercard_payment_method_icon_142750.png';
        this.textCard = 'Mastercard';
        break;
      case 'AMEX':
        this.cardIcon = 'https://cdn-icons-png.flaticon.com/512/349/349228.png';
        this.textCard = 'American Express';
        break;
      case 'HIPER':
        this.cardIcon = 'https://seeklogo.com/images/H/hipercard-logo-24ACB8E6BE-seeklogo.com.png';
        this.textCard = 'Hipercard';
        break;
      case 'DINERS':
        this.cardIcon = 'https://cdn-icons-png.flaticon.com/512/196/196548.png';
        this.textCard = 'Diners';
        break;
      case 'ELO':
        this.cardIcon = 'https://logodownload.org/wp-content/uploads/2017/04/elo-logo-1-1.png';
        this.textCard = 'Elo';
        break;

      default:
        this.cardIcon = 'https://cdn.icon-icons.com/icons2/2072/PNG/512/card_credit_internet_lock_locked_padlock_security_icon_127043.png';
        this.textCard = 'Cartão Inválido';
        break;
    }
  }
}
