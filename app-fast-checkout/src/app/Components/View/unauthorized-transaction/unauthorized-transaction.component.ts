import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized-transaction',
  templateUrl: './unauthorized-transaction.component.html',
  styleUrls: ['./unauthorized-transaction.component.scss']
})
export class UnauthorizedTransactionComponent {
  cardIcon: string = 'https://cdn.icon-icons.com/icons2/2342/PNG/512/mastercard_payment_method_icon_142750.png';
  textCard: string = 'Mastercard';
}
