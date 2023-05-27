import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { DataService } from 'src/app/Service/data.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.scss']
})
export class PagamentoComponent implements OnInit{
  selectedPaymentType: string = 'Cartão de Crédito';
  totalAmount: number = 0;
  paymentTypes = [
    { classIcon: 'bi bi-credit-card', type: 'Cartão de Crédito', description: 'Em até 21 vezes' },
    { classIcon: 'bi bi-cash-coin', type: 'Cartão de Débito Virtual Caixa', description: 'Bolsa Família' },
    { classIcon: 'bi bi-x-diamond-fill', type: 'Pagamento Instantâneo', description: 'PIX' }
  ];

  constructor(private dataService: DataService, private apiService: ApiService) { }

  ngOnInit() {
    this.totalAmount = this.dataService.getTotalAmount();
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

}
