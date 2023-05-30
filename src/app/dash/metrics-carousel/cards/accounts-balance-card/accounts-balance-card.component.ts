import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AccountsMap } from 'src/app/_common/_models/Account';
import { AccountsService } from 'src/app/_common/_services/Accounts.service';
import { CurrentBudgetService } from 'src/app/_common/_services/CurrentBudget.service';

@Component({
  selector: 'app-accounts-balance-card',
  templateUrl: './accounts-balance-card.component.html',
  styleUrls: ['./accounts-balance-card.component.scss']
})
export class AccountsBalanceCardComponent {

  public systemDefaultAccountBalance: number = 0;

  public ALL_ACCOUNT_IDS: string[] = [];
  public ALL_ACCOUNTS: AccountsMap = {};

  private unsubscribeNotifier = new Subject();

  constructor(private _accountsService: AccountsService, private _currentBudgetService: CurrentBudgetService) {

  }

  ngOnInit() {
    this._accountsService.ACCOUNTS_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( accountsData => {
      this.systemDefaultAccountBalance = Number(accountsData.values['default']?.balance);
      this.ALL_ACCOUNTS = accountsData.values;
      this.ALL_ACCOUNT_IDS = accountsData.keys;
    });
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next(null);
  }

  getAccountsExceptDefault() {

    return this.ALL_ACCOUNT_IDS.filter( accId => accId !== 'default');
  }
}
