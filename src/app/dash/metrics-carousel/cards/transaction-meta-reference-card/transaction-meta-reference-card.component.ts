import { Component, OnDestroy, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { Subject, firstValueFrom, takeUntil } from 'rxjs';
import { ICurrentBudgetSettings } from 'src/app/_common/_models/CurrentBudgetSettings';
import { ITransaction, ITransactionsMap } from 'src/app/_common/_models/ITransaction';
import { TransactionTypesMap } from 'src/app/_common/_models/TransactionType';
import { CommonDataService } from 'src/app/_common/_services/CommonData.service';
import { CurrentBudgetService } from 'src/app/_common/_services/CurrentBudget.service';

@Component({
  selector: 'app-transaction-meta-reference-card',
  templateUrl: './transaction-meta-reference-card.component.html',
  styleUrls: ['./transaction-meta-reference-card.component.scss']
})
export class TransactionMetaReferenceCardComponent implements OnInit, OnDestroy {

  public updatedOn!: Date | null;
  public wrapUpToggle: boolean = false;
  public wrapUpUpdated?: Date;

  public lastTransaction?: Partial<ITransaction>;
  public lastTransaction_transactionType?: string;
  public lastTransaction_category?: string;

  private _unsubscribe = new Subject();

  constructor(private _currentBudgetService: CurrentBudgetService, private _commonDataService: CommonDataService) {
  }

  ngOnInit() {
    this._currentBudgetService.budgetSettingsUpdated.pipe(takeUntil(this._unsubscribe)).subscribe( currentBudgetSettings => {
      try {
        this.updatedOn = (currentBudgetSettings!.lastUpdatedOn!.value! as Timestamp).toDate();
      } catch {
        this.updatedOn = null;
      }
      this.wrapUpToggle = currentBudgetSettings.todaysUpdatedToggle?.value || this.wrapUpToggle;
      this.wrapUpUpdated = currentBudgetSettings.todaysUpdatedToggle?.updatedOn?.toDate();
      const transactionId = currentBudgetSettings.lastUpdatedOn?.transaction;

      if(transactionId) {
        this.joinLastTransaction(transactionId);
      }
    });
  }

  joinLastTransaction(transactionId: string) {

    firstValueFrom(this._commonDataService.TRANSACTIONS_CHANGED)
    .then( transactions => transactions.values[transactionId])
    .then( transaction => {
      this.lastTransaction = transaction;
      return firstValueFrom(this._commonDataService.TRANSACTIONTYPES_CHANGED);
    })
    .then(transactionTypes => {
      this.lastTransaction_transactionType = transactionTypes.values[this.lastTransaction!.transactionType!].name!;
      if (this.lastTransaction!.category) {
        return firstValueFrom(this._commonDataService.CATEGORIES_CHANGED);
      }
      return null
    }).then(categories => {
      if (categories) {
        this.lastTransaction_category = categories.values[this.lastTransaction!.category!].name!;
      }
    }).then(() => {

    });
  }


  toggle() {
    this._currentBudgetService.toggleTodaysUpdate(this.wrapUpToggle);
  }

  ngOnDestroy() {
    this._unsubscribe.next(null);
  }
}
