import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdClienteInstalacaoComponent } from './id-cliente-instalacao.component';

describe('IdClienteInstalacaoComponent', () => {
  let component: IdClienteInstalacaoComponent;
  let fixture: ComponentFixture<IdClienteInstalacaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdClienteInstalacaoComponent]
    });
    fixture = TestBed.createComponent(IdClienteInstalacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
