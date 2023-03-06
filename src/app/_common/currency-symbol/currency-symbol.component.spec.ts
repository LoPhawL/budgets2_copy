import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySymbolComponent } from './currency-symbol.component';

describe('CurrencySymbolComponent', () => {
  let component: CurrencySymbolComponent;
  let fixture: ComponentFixture<CurrencySymbolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencySymbolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencySymbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
