import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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

  // for now showing only expense categories
  // can be changed to show categories belonging to any expense type
  // considerations: budgeted categoties vs non-budgeted categories.

  public categories: Partial<Category>[] = [];

  constructor(
    private _commonDataService: CommonDataService,
    private _dashDataService: DashboardDataService
  ) {

  }

  ngOnDestroy(): void {
    this._unsubscribeNotifier.next(null);
  }

  ngOnInit(): void {
    this._commonDataService.CATEGORIES_CHANGED
    .pipe(takeUntil(this._unsubscribeNotifier))
    .subscribe(catagoriesData => {
      catagoriesData.keys.forEach(incomingCategories => {
        const categ = catagoriesData.values[incomingCategories];
        this.categories.push(categ);
      });

      this.getTotalExpenseOfCategories();
    });
  }

  private getTotalExpenseOfCategories() {
    if (this.categories.length) {
      this._dashDataService.getTotalExpenseForCategories(this.categories.map(categ => String(categ.id)));
    }
  }
}
