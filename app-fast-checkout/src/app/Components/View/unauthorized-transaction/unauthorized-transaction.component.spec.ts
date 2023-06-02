import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedTransactionComponent } from './unauthorized-transaction.component';

describe('UnauthorizedTransactionComponent', () => {
  let component: UnauthorizedTransactionComponent;
  let fixture: ComponentFixture<UnauthorizedTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthorizedTransactionComponent]
    });
    fixture = TestBed.createComponent(UnauthorizedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
