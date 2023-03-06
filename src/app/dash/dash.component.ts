import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AccountsMap } from '../_common/_models/Account';
import { AccountsService } from '../_common/_services/Accounts.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, OnDestroy {

  public systemDefaultAccountBalance: number = 0;

  public ALL_ACCOUNT_IDS: string[] = [];
  public ALL_ACCOUNTS: AccountsMap = {};

  private unsubscribeNotifier = new Subject();

  constructor(    
    private _accountsService: AccountsService
  ) {}

  ngOnInit() {
    this._accountsService.ACCOUNTS_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( accountsData => {
      this.systemDefaultAccountBalance = Number(accountsData.values['default']?.balance);
      this.ALL_ACCOUNTS = accountsData.values;
      this.ALL_ACCOUNT_IDS = accountsData.keys;
    })
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next(null);
  }

  getAccountsExceptDefault() {
    return this.ALL_ACCOUNT_IDS.filter( accId => accId !== 'default')
  }
}
