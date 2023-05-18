import { Component } from '@angular/core';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.scss']
})
export class FaturasComponent {
  dynamicRouteNext = '/pagamento';
  btnNext = 'btnNext';
  dynamicRouteBack = '/idClienteInstalacao';
  btnBack = 'btnBack';
  routeCDC = '/faturas';
  routeFatura = '/home';
  numeracao = '2-3'
  txtPaginator = 'Seleção de Faturas'
}
