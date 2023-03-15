import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ITransaction, ITransactionsMap } from 'src/app/_common/_models/ITransaction';
import { Category } from 'src/app/_common/_models/TransactionCategory';
import { CommonDataService } from 'src/app/_common/_services/CommonData.service';
import { DashboardDataService } from '../_services/DashboardData.service';

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
  public consolidatedExpenses: any = {};

  public all_transactions: Partial<ITransaction>[] = [];

  constructor(
    private _commonDataService: CommonDataService
    // private _dashDataService: DashboardDataService
  ) {}

  ngOnDestroy(): void {
    this._unsubscribeNotifier.next(null);
  }

  ngOnInit(): void {
    this._commonDataService.CATEGORIES_CHANGED
    .pipe(takeUntil(this._unsubscribeNotifier))
    .subscribe(catagoriesData => {
      this.categories = [];
      catagoriesData.keys.forEach(incomingCategories => {
        const categ = catagoriesData.values[incomingCategories];
        this.categories.push(categ);
      });

      this.computeTotalExpenseOfCategories();
    });

    this._commonDataService.TRANSACTIONS_CHANGED
    .pipe(takeUntil(this._unsubscribeNotifier))
    .subscribe( transactions => {
      this.all_transactions = transactions.raw;
      this.computeTotalExpenseOfCategories();
    });
  }

  public getExpenseCategoriesForDisplay() {
    return this.categories.filter(cat => cat.transactionType === 'expense');
  }

  public getCategoryBarColor(spentPercent: number) {
    const date = new Date();
    const today = date.getDate();
    const totalDays = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();

    const dayPercent = today/totalDays*100;

    const allowedToActual = spentPercent/dayPercent*100;
    console.log(allowedToActual);

    if(allowedToActual < 30) {
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

  private computeTotalExpenseOfCategories() {
    if (this.categories.length) {
      const expenseCategories = this.getExpenseCategoriesForDisplay();
      expenseCategories.forEach(cat => this.consolidatedExpenses[cat.id!] = 0);

      this.all_transactions.forEach(trns => {
        if(trns.category) {
          this.consolidatedExpenses[trns.category] += trns.amount;
        }
      });
    }
  }


}
