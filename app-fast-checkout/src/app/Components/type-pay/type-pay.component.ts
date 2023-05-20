import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-type-pay',
  templateUrl: './type-pay.component.html',
  styleUrls: ['./type-pay.component.scss']
})
export class TypePayComponent {
  @Input() classIcon?: string;
  @Input() type!: string;
  @Input() description!: string;
}
