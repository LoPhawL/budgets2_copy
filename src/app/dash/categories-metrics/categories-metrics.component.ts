import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/_common/_models/TransactionCategory';
import { CommonDataService } from 'src/app/_common/_services/CommonData.service';
import { ConsolidatedCategory } from '../_models/ConsolidatedCategory';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-categories-metrics',
  templateUrl: './categories-metrics.component.html',
  styleUrls: ['./categories-metrics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesMetricsComponent implements OnInit, OnDestroy {

  public faInfo = faInfoCircle;

  private _unsubscribeNotifier = new Subject();

  // for now showing only expense categories - hardcoded below in more than one place
  // can be changed to show categories belonging to any expense type
  // considerations: budgeted categoties vs non-budgeted categories.

  public categories: Partial<Category>[] = [];
  public consolidatedExpenses: { [key: string]: ConsolidatedCategory } = {};

  public currencyUnrelatedTotalExpense: number = 0;
  public totalExpense: {
    value: number;
    [currencyKey: string] : number
  } = { value: 0 }

  public totalExpensesForDisplay: any = [];

  constructor(
    private _commonDataService: CommonDataService,
    private _cdc: ChangeDetectorRef
  ) {
    this.consolidatedExpenses['uncategorized'] = new ConsolidatedCategory('uncategorized');
    this.consolidatedExpenses['uncategorized'].transactionType = 'expense';
  }

  ngOnDestroy(): void {
    this._unsubscribeNotifier.next(null);
  }

  ngOnInit(): void {
    this.categories.push(new Category('uncategorized', 'Uncategorized expenses', 'GBP', '', 0, 'expense'));
    this._commonDataService.CATEGORIES_CHANGED
    .pipe(takeUntil(this._unsubscribeNotifier))
    .subscribe(catagoriesData => {

      // this.categories = [];
      catagoriesData.keys.forEach(incomingCategory => {
        const categ = catagoriesData.values[incomingCategory];
        this.categories.push(categ);

        this.consolidatedExpenses[incomingCategory] =
          this.consolidatedExpenses[incomingCategory] ||
          new ConsolidatedCategory(incomingCategory);

          this.consolidatedExpenses[incomingCategory].transactionType = categ.transactionType!;
      });
      // repaint
      this.totalExpensesForDisplay = this.getTotalExpenses();
      setTimeout(() => {
        this._cdc.markForCheck();
      }, 0);
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
      // repaint
      this.totalExpensesForDisplay = this.getTotalExpenses();
      setTimeout(() => {
        this._cdc.markForCheck();
      }, 0);
    });
  }

  public getExpenseCategoriesForDisplay() {

    const catsToDisplay: Partial<Category>[] = [];
    this.categories.forEach(cat => {
        if (cat.transactionType === 'expense') {
          catsToDisplay.push(cat);
        }
      });

    return catsToDisplay;
  }

  public hasExpensesInOtherCurrencies(category: Partial<Category>) {

    const currency = category.currency || '';
    const allCurrencies = this.consolidatedExpenses[category.id!].categoryTotalByCurrency;
    let allCurrencyKeys: string[];
    if ((allCurrencyKeys = Object.keys(allCurrencies)).length == 1) {
      return false;
    }
    const allCurrencyKeysCopy: any = [ ...allCurrencyKeys ];
    allCurrencyKeysCopy.splice(allCurrencyKeys.indexOf(currency), 1);
    for (let currency of allCurrencyKeysCopy) {
      if (allCurrencies[currency] > 0) {
        return true;
      }
    }
    return false;
  }

  public getOtherCurrencyExpenses(category: Partial<Category>): any {
    const displays = [];
    const defaultCurrency = category.currency;
    const allCurrenciesTotal = this.consolidatedExpenses[category.id!].categoryTotalByCurrency;
    for (let currency in allCurrenciesTotal) {
      if (currency !== defaultCurrency) {
        displays.push({ currency, value: allCurrenciesTotal[currency] });
      }
    }

    return displays;
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

  public getTotalExpenses() {

    const totalExpenses: any = [];
    this.currencyUnrelatedTotalExpense = this.totalExpense.value;
    for (let key of Object.keys(this.totalExpense)) {

      if (key !== 'value') {
        totalExpenses.push( { currency: key, total: this.totalExpense[key] } );
      }
    }
    console.log(this.consolidatedExpenses);

    return totalExpenses;
  }
}
