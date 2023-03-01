import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { AccountsMap } from '../../_models/Account';
import { ITransaction } from '../../_models/ITransaction';
import { CategoriesMap } from '../../_models/TransactionCategory';
import { ITransactionRule, TransactionTypesMap } from '../../_models/TransactionType';
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

  ALL_ACCOUNT_IDS: string[] = [];
  ALL_ACCOUNTS: AccountsMap = {};

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
      amount: new FormControl(null, [Validators.required, Validators.min(0)]),
      accountsToTransact: new FormArray([])
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

    this._accountsService.ACCOUNTS_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( accs => {
      this.ALL_ACCOUNT_IDS = accs.keys;
      this.ALL_ACCOUNTS = accs.values;
    });
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next(null);
  }

  getDisplayName(id: string, entity: 'category_type' | 'transaction_type' | 'account') {

    if (entity === 'category_type') {
      return this.ALL_CATEGORIES[id].name;
    }
    if (entity === 'transaction_type') {
      return this.ALL_TRANSACTIONTYPES[id].name;
    }
    if (entity === 'account') {
      if (id === 'default') {
        return 'The default account';
      }
      return this.ALL_ACCOUNTS[id].name
    }
    return '';
  }

  transactionTypeChanged() {
    // populate categories
    const transactionType = this.transactionForm.get('transactionType')?.value;
    if (transactionType) {
      this.CATEGORY_IDS_FOR_DISPLAY  = this.ALL_CATEGORY_IDS.filter( categoryId => {
        return this.ALL_CATEGORIES[categoryId].transactionType === transactionType
      });
      if (!this.CATEGORY_IDS_FOR_DISPLAY.length) {
        this.transactionForm.get('category')?.disable();
      } else {
        this.transactionForm.get('category')?.enable();
      }

      //get rules of the transaction type
      (this.transactionForm.get('accountsToTransact') as FormArray).clear();
      const selectedTransactionType = this.ALL_TRANSACTIONTYPES[transactionType];
      const rules = selectedTransactionType.rules;
      rules?.sort( (a,b) => a.order - b.order )
      .forEach( rule => {
        if (rule.account === 'ANY') {
          // insert an enabled dropdown
          // const ctrl = new MetaFormControl({Validators: [Validators.required]});
          const ctrl = new MetaFormControl({value: null}, [Validators.required], {order: rule.order});
          (this.transactionForm.get('accountsToTransact') as FormArray).controls.push(ctrl);
        } else if (rule.account === 'default') {
          // insert a disabled dropdown - select default
          if (rules.length > 1) {
            const ctrl = new MetaFormControl({ value: 'default', disabled: true}, null, {order: rule.order});
            (this.transactionForm.get('accountsToTransact') as FormArray).controls.push(ctrl);
          }
        } else {
          // insert a disabled dropdown - select the account with id in the rule
          if (rules.length > 1) {
            const ctrl = new MetaFormControl({ value: rule.account, disabled: true}, null, {order: rule.order});
            (this.transactionForm.get('accountsToTransact') as FormArray).controls.push(ctrl);
            // (this.transactionForm.get('accountsToTransact') as FormArray).controls.push(new FormControl({ value: rule.account, disabled: true}))
          }
        }
      });
    }
  }

  getTransactingAccounts() {
    const accToTransact = (this.transactionForm.get('accountsToTransact') as FormArray);
    return accToTransact.controls;
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
    const transactionTypeRulesForCalculation = JSON.parse(JSON.stringify(this.ALL_TRANSACTIONTYPES[transaction.transactionType!].rules!)) as ITransactionRule[];
    const selectedTransactionRuleAccountControls = (this.transactionForm.get('accountsToTransact') as FormArray).controls;
    console.log(1, transactionTypeRulesForCalculation);

    for (let ruleAccountControl of selectedTransactionRuleAccountControls) {

      const order = (ruleAccountControl as MetaFormControl).metaData.order;
      const rule = transactionTypeRulesForCalculation.find(transactionTypeRule => transactionTypeRule.order === order);

      // if (rule) {
        rule!.account = ruleAccountControl.value;
      // }
    }
    const modifiedAccounts = this._accountsService.runTransaction(transactionTypeRulesForCalculation, transaction.amount!);
    // in a transaction, save transaction and modifiedAccounts
    const batch = this._fsService.getBatch();
    this._currentBudgetService.saveTransaction(transaction, batch);
    modifiedAccounts.forEach(account => this._accountsService.saveAccount(account, batch))
    batch.commit().then( () => this._currentModal.close('added') );
  }
}

class MetaFormControl extends FormControl {
  metaData: any;
  constructor(configs: any, validators: any, metaData: any) {
    if (validators?.length) {
      super(configs, validators);
    } else {
      super(configs);
    }
    this.metaData = metaData;
  }
}
