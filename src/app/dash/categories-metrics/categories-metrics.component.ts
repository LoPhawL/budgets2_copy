import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ITransaction, ITransactionsMap } from 'src/app/_common/_models/ITransaction';
import { Category } from 'src/app/_common/_models/TransactionCategory';
import { CommonDataService } from 'src/app/_common/_services/CommonData.service';
import { ConsolidatedCategory } from '../_models/ConsolidatedCategory';

@Component({
  selector: 'app-categories-metrics',
  templateUrl: './categories-metrics.component.html',
  styleUrls: ['./categories-metrics.component.scss']
})
export class CategoriesMetricsComponent implements OnInit, OnDestroy {

  private _unsubscribeNotifier = new Subject();

  // for now showing only expense categories - hardcoded below in more than one place
  // can be changed to show categories belonging to any expense type
  // considerations: budgeted categoties vs non-budgeted categories.

  public categories: Partial<Category>[] = [];
  public consolidatedExpenses: { [key: string]: ConsolidatedCategory } = {};

  public totalExpense: {
    value: number
  } = { value: 0}


  // public all_transactions: Partial<ITransaction>[] = [];

  constructor(
    private _commonDataService: CommonDataService
    // private _dashDataService: DashboardDataService
  ) {
    this.consolidatedExpenses['uncategorized'] = new ConsolidatedCategory('uncategorized');
    this.consolidatedExpenses['uncategorized'].transactionType = 'expense';
  }

  ngOnDestroy(): void {
    this._unsubscribeNotifier.next(null);
  }

  ngOnInit(): void {
    this._commonDataService.CATEGORIES_CHANGED
    .pipe(takeUntil(this._unsubscribeNotifier))
    .subscribe(catagoriesData => {

      this.categories = [];
      catagoriesData.keys.forEach(incomingCategory => {
        const categ = catagoriesData.values[incomingCategory];
        this.categories.push(categ);

        this.consolidatedExpenses[incomingCategory] =
          this.consolidatedExpenses[incomingCategory] ||
          new ConsolidatedCategory(incomingCategory);

          this.consolidatedExpenses[incomingCategory].transactionType = categ.transactionType!;
      });
    });

    this._commonDataService.TRANSACTIONS_CHANGED
    .pipe(takeUntil(this._unsubscribeNotifier))
    .subscribe( transactions => {

      const transactions_raw_changeset = transactions.rawChangeSet;
      for (let transKey of Object.keys(transactions_raw_changeset)) {
        const transaction = transactions_raw_changeset[transKey].doc!
        if (transaction.transactionType === 'expense') {
          if (!transactions_raw_changeset[transKey].doc!.category) {
            transactions_raw_changeset[transKey].doc!.category = 'uncategorized';
          }

          const cat = transactions_raw_changeset[transKey].doc!.category!;
          const consolidatedExpense = this.consolidatedExpenses[cat] || new ConsolidatedCategory(cat);
          consolidatedExpense.addTransaction(transactions_raw_changeset[transKey].doc!, transactions_raw_changeset[transKey].type!, this.totalExpense);
        }
      }
      console.log(this.totalExpense);

    });
  }

  public getExpenseCategoriesForDisplay() {
    const catsToDisplay = [];
    catsToDisplay.push(({
      name: 'Uncategorized',
      id: 'uncategorized',
      transactionType: 'expense',
      maxMonthly: undefined
    }) as Partial<Category>);

    this.categories.forEach(cat => {
        if (cat.transactionType === 'expense') {
          catsToDisplay.push(cat);
        }
      });

    return catsToDisplay;
  }

  public getCategoryBarColor(spentPercent: number) {
    const date = new Date();
    const today = date.getDate();
    const totalDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    const dayPercent = today/totalDays*100;
    const allowedToActual = spentPercent/dayPercent*100;

    if(allowedToActual < 45) {
      return 'success';
    }
    if (allowedToActual <= 100) {
      return 'info';
    }
    if (allowedToActual <= 150) {
      return 'warning';
    }
    return 'danger';
  }

}
