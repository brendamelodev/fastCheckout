import { ViewportScroller } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IdClienteP1Component } from '../View/id-cliente-p1/id-cliente-p1.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  @ViewChild('componentRef') componentRef!: IdClienteP1Component;

  constructor(private viewportScroller: ViewportScroller) {}

  scrollToComponent() {
    this.viewportScroller.scrollToAnchor('componentRef');
  }
}
