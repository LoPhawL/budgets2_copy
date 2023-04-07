import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsBalanceCardComponent } from './accounts-balance-card.component';

describe('AccountsBalanceCardComponent', () => {
  let component: AccountsBalanceCardComponent;
  let fixture: ComponentFixture<AccountsBalanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsBalanceCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountsBalanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
