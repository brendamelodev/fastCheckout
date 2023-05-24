import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() dynamicRouteNext?: string;
  @Input() dynamicRouteBack?: string;
  @Input() dynamicRoutePay?: string;
  @Input() btnNext!: string;
  @Input() btnBack!: string;
  @Input() btnPay!: string;
  @Input() disabled = false;

  constructor() { }
}
