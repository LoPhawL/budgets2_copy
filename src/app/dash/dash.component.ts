import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AccountsService } from '../_common/_services/Accounts.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, OnDestroy {

  public systemDefaultAccountBalance: number = 0;

  private unsubscribeNotifier = new Subject();

  constructor(    
    private _accountsService: AccountsService
  ) {}

  ngOnInit() {
    this._accountsService.ACCOUNTS_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( accountsData => {
      this.systemDefaultAccountBalance = Number(accountsData.values['default']?.balance);
    })
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next(null);
  }
}
