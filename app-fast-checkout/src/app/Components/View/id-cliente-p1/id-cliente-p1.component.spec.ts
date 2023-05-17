import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdClienteP1Component } from './id-cliente-p1.component';

describe('IdClienteP1Component', () => {
  let component: IdClienteP1Component;
  let fixture: ComponentFixture<IdClienteP1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdClienteP1Component]
    });
    fixture = TestBed.createComponent(IdClienteP1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
