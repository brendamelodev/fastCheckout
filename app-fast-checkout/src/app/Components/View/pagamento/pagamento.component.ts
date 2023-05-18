import { Component } from '@angular/core';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent {
  dynamicRoutePay = '/';
  btnPay = 'btnPay';
  dynamicRouteBack = '/faturas';
  btnBack = 'btnBack';
}
