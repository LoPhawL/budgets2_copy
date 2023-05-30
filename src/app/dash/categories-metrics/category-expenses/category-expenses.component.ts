import { Component, Input } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { ConsolidatedCategory } from '../../_models/ConsolidatedCategory';

@Component({
  selector: 'app-category-expenses',
  templateUrl: './category-expenses.component.html',
  styleUrls: ['./category-expenses.component.scss']
})
export class CategoryExpensesComponent {

  @Input()
  public consolidatedExpenses?: ConsolidatedCategory = undefined;
}
