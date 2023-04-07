import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMetaReferenceCardComponent } from './transaction-meta-reference-card.component';

describe('TransactionMetaReferenceCardComponent', () => {
  let component: TransactionMetaReferenceCardComponent;
  let fixture: ComponentFixture<TransactionMetaReferenceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionMetaReferenceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionMetaReferenceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
