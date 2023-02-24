import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { ITransaction } from '../../_models/ITransaction';
import { CategoriesMap } from '../../_models/TransactionCategory';
import { TransactionTypesMap } from '../../_models/TransactionType';
import { AccountsService } from '../../_services/Accounts.service';
import { CommonDataService } from '../../_services/CommonData.service';
import { CurrentBudgetService } from '../../_services/CurrentBudget.service';
import { FirestoreService } from '../../_services/Firestore.service';
import { EitherNotesOrCategoryRequiredForTransaction } from '../../_validators/newTransaction_notesOrCategory_required';

@Component({
  selector: 'app-add-transaction-popup',
  templateUrl: './add-transaction-popup.component.html',
  styleUrls: ['./add-transaction-popup.component.scss']
})
export class AddTransactionPopupComponent implements OnInit, OnDestroy {

  CATEGORY_IDS_FOR_DISPLAY: string[] = [];
  ALL_TRANSACTIONTYPE_IDS: string[] = [];
  ALL_TRANSACTIONTYPES: TransactionTypesMap = {};
  ALL_CATEGORY_IDS: string[] = [];
  ALL_CATEGORIES: CategoriesMap = {};

  private unsubscribeNotifier = new Subject();

  transactionForm: FormGroup;


  constructor(
    private _dataService: CommonDataService,
    private _accountsService: AccountsService,
    private _fsService: FirestoreService,
    private _currentBudgetService: CurrentBudgetService,
    private _currentModal: NgbActiveModal
  ) {
    this.transactionForm = new FormGroup({
      transactionNote: new FormControl(null),
      transactionType: new FormControl('', [Validators.required]),
      category: new FormControl({ value: null, disabled: true}),
      amount: new FormControl(null, [Validators.required, Validators.min(0)])
    });

    this.transactionForm.setValidators(EitherNotesOrCategoryRequiredForTransaction)
  }

  ngOnInit() {
    this._dataService.TRANSACTIONTYPES_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( transactionTypes => {
      this.ALL_TRANSACTIONTYPE_IDS = transactionTypes.keys;
      this.ALL_TRANSACTIONTYPES = transactionTypes.values;
    });

    this._dataService.CATEGORIES_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( categories => {
      this.ALL_CATEGORY_IDS = categories.keys;
      this.ALL_CATEGORIES = categories.values;
      this.transactionTypeChanged();
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

  transactionTypeChanged() {
    // populate categories
    const transactionType = this.transactionForm.get('transactionType')?.value;
    this.CATEGORY_IDS_FOR_DISPLAY  = this.ALL_CATEGORY_IDS.filter( categoryId => {
      return this.ALL_CATEGORIES[categoryId].transactionType === transactionType
    });
    if (!this.CATEGORY_IDS_FOR_DISPLAY.length) {
      this.transactionForm.get('category')?.disable();
    } else {
      this.transactionForm.get('category')?.enable();
    }
  }

  submit() {
    const transaction: Partial<ITransaction> = {
      note: String(this.transactionForm.get('transactionNote')?.value),
      transactionType: String(this.transactionForm.get('transactionType')?.value),
      category: this.transactionForm.get('catrgory')?.value || null,
      amount: Number(this.transactionForm.get('amount')?.value),
      date: new Date(),
      tags: {},
      labels: []
    };
    transaction.date = new Date();
    const modifiedAccounts = this._accountsService.runTransaction(this.ALL_TRANSACTIONTYPES[transaction.transactionType!].rules!, transaction.amount!);
    // in a transaction, save transaction and modifiedAccounts
    const batch = this._fsService.getBatch();
    this._currentBudgetService.saveTransaction(transaction, batch);
    modifiedAccounts.forEach(account => this._accountsService.saveAccount(account, batch))
    batch.commit().then( () => this._currentModal.close('added') );
  }
}
