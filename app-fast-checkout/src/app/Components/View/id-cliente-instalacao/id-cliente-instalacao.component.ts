import { Component, Input } from '@angular/core';
import { ContractAccount } from 'src/app/Models/interfaces';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-id-cliente-instalacao',
  templateUrl: './id-cliente-instalacao.component.html',
  styleUrls: ['./id-cliente-instalacao.component.scss']
})
export class IdClienteInstalacaoComponent {
  accountContractData!: ContractAccount;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      this.accountContractData = data;
      console.log(this.accountContractData);
    });

  }
}
