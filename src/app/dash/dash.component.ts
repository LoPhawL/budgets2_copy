import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AddTransactionPopupComponent } from '../_common/popups/add-transaction-popup/add-transaction-popup.component';
import { Account } from '../_common/_models/Account';
import { IParsedDocument } from '../_common/_models/IParsedDocument';
import { AccountsService } from '../_common/_services/Accounts.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit, OnDestroy {

  public systemDefaultAccountBalance: number = 0;

  private unsubscribeNotifier = new Subject();

  // public parsedAccountsData: IParsedDocument<Account> = {
  //   keys: [],
  //   values: {},
  //   length: 0
  // }

  constructor(
    private _modalService: NgbModal,
    private _toastr: ToastrService,
    private _accountsService: AccountsService
  ) {
    // this.AddTransaction();
  }

  ngOnInit() {
    this._accountsService.ACCOUNTS_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( accountsData => {
      this.systemDefaultAccountBalance = Number(accountsData.values['default']?.balance);
    })
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next(null);
  }

  AddTransaction() {

    const modalRef = this._modalService.open(AddTransactionPopupComponent);
    modalRef.closed.subscribe(result => {
      if (result === 'added') {
        this._toastr.info('Transaction added successfully.');
      }
    });
  }
}
