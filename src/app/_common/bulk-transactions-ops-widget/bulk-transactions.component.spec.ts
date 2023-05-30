import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkTransactionsComponent } from './bulk-transactions.component';

describe('BulkTransactionsComponent', () => {
  let component: BulkTransactionsComponent;
  let fixture: ComponentFixture<BulkTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkTransactionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
