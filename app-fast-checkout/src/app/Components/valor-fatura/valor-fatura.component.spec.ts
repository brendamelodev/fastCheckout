import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorFaturaComponent } from './valor-fatura.component';

describe('ValorFaturaComponent', () => {
  let component: ValorFaturaComponent;
  let fixture: ComponentFixture<ValorFaturaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValorFaturaComponent]
    });
    fixture = TestBed.createComponent(ValorFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
