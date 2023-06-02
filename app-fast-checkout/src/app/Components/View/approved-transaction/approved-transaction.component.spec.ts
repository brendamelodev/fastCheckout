import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedTransactionComponent } from './approved-transaction.component';

describe('ApprovedTransactionComponent', () => {
  let component: ApprovedTransactionComponent;
  let fixture: ComponentFixture<ApprovedTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedTransactionComponent]
    });
    fixture = TestBed.createComponent(ApprovedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
