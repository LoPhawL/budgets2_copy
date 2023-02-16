import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ITransaction } from '../../_models/ITransaction';
import { CategoriesMap } from '../../_models/TransactionCategory';
import { TransactionTypesMap } from '../../_models/TransactionType';
import { AccountsService } from '../../_services/Accounts.service';
import { CommonDataService } from '../../_services/CommonData.service';
import { FirestoreService } from '../../_services/Firestore.service';

@Component({
  selector: 'app-add-transaction-popup',
  templateUrl: './add-transaction-popup.component.html',
  styleUrls: ['./add-transaction-popup.component.scss']
})
export class AddTransactionPopupComponent implements OnInit, OnDestroy {

  ALL_TRANSACTIONTYPE_IDS: string[] = [];
  ALL_TRANSACTIONTYPES: TransactionTypesMap = {};
  ALL_CATEGORY_IDS: string[] = [];
  ALL_CATEGORIES: CategoriesMap = {};

  private unsubscribeNotifier = new Subject();

  transactionForm = new FormGroup({
    transactionType: new FormControl('', [Validators.required]),
    category: new FormControl(''),
    amount: new FormControl('', [Validators.required, Validators.min(0)])
  });


  constructor(
    private _dataService: CommonDataService,
    private _accountsService: AccountsService,
    private _fsService: FirestoreService
  ) {}

  ngOnInit() {
    this._dataService.TRANSACTIONTYPES_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( transactionTypes => {
      this.ALL_TRANSACTIONTYPE_IDS = transactionTypes.keys;
      this.ALL_TRANSACTIONTYPES = transactionTypes.values;
    });

    this._dataService.CATEGORIES_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( categories => {
      this.ALL_CATEGORY_IDS = categories.keys;
      this.ALL_CATEGORIES = categories.values;
    });
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next(null);
  }

  getDisplayName(id: string, entity: 'category_type' | 'transaction_type') {

    if (entity === 'category_type') {
      return this.ALL_CATEGORIES[id].name;
    }
    if (entity === 'transaction_type') {
      return this.ALL_TRANSACTIONTYPES[id].name;
    }
    return '';
  }

  // calculateTransaction(event: any) {
  //   console.log(this.transactionForm.get('transactionType')?.value);
  //   // get the rules for transactions,
    // if there are rules that has accounts as 'ANY', add form controls to get accounts
  // }

  submit() {
    const transaction: Partial<ITransaction> = {
      transactionType: String(this.transactionForm.get('transactionType')?.value),
      category: this.transactionForm.get('catrgory')?.value,
      amount: Number(this.transactionForm.get('amount')?.value),
      date: new Date(),
      tags: {},
      labels: []
    };
    transaction.date = new Date();
    const modifiedAccounts = this._accountsService.runTransaction(this.ALL_TRANSACTIONTYPES[transaction.transactionType!].rules!, transaction.amount!);
    // in a transaction, save transaction and modifiedAccounts
    const batch = this._fsService.getBatch();
    
  }
}
