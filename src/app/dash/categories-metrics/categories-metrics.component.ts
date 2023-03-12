import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ITransaction } from 'src/app/_common/_models/ITransaction';
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
  public consolidatedExpense: any = {};

  constructor(
    private _commonDataService: CommonDataService,
    private _dashDataService: DashboardDataService
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

    this._commonDataService.newTransactionCommitted.subscribe( (transaction: Partial<ITransaction>) => {
      if (transaction.transactionType === 'expense') {
        this.consolidatedExpense[transaction.category!] = (this.consolidatedExpense[transaction.category!] || 0) + transaction.amount;
      }
    })
  }

  public getCategoriesForDisplay() {
    return this.categories.filter(cat => cat.transactionType === 'expense');
  }

  private computeTotalExpenseOfCategories() {
    if (this.categories.length) {
      this._dashDataService.getTotalExpenseForCategories(this.categories.map(categ => String(categ.id)))
      .then(querySnapshots => {
        querySnapshots.forEach(querySnapshot => {
            querySnapshot.forEach(doc => {
              const docData: any = doc.data();
              this.consolidatedExpense[docData.category] = (this.consolidatedExpense[docData.category] || 0) + docData.amount;
            });
        });
      });
    }
  }
}
