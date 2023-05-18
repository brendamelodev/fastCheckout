import { Component } from '@angular/core';

@Component({
  selector: 'app-id-cliente-instalacao',
  templateUrl: './id-cliente-instalacao.component.html',
  styleUrls: ['./id-cliente-instalacao.component.scss']
})
export class IdClienteInstalacaoComponent {
  dynamicRouteBack = '/home';
  btnBack = 'btnBack';
  routeCDC = '/faturas';
  numeracao = '1-3'
  txtPaginator = 'Identificação do Cliente'
}
