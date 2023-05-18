import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturasComponent } from './faturas.component';

describe('FaturasComponent', () => {
  let component: FaturasComponent;
  let fixture: ComponentFixture<FaturasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FaturasComponent]
    });
    fixture = TestBed.createComponent(FaturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
