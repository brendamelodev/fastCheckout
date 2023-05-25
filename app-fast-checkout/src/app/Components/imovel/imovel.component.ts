import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.scss']
})
export class ImovelComponent {
  @Input() routeCDC?: string;

}
