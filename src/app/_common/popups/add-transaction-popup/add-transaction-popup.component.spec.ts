import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTransactionPopupComponent } from './add-transaction-popup.component';

describe('AddTransactionPopupComponent', () => {
  let component: AddTransactionPopupComponent;
  let fixture: ComponentFixture<AddTransactionPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTransactionPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTransactionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
