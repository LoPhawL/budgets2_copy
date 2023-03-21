import { Component, Input, OnInit } from '@angular/core';
import { ConsolidatedCategory } from '../../_models/ConsolidatedCategory';

@Component({
  selector: 'app-category-expenses',
  templateUrl: './category-expenses.component.html',
  styleUrls: ['./category-expenses.component.scss']
})
export class CategoryExpensesComponent {

  @Input()
  public consolidatedExpenses?: ConsolidatedCategory = undefined;

  getDate(dt: string) {
    return new Date(Number(dt));
  }
}
