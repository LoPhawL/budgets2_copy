import { Component } from '@angular/core';
import { CurrentBudgetService } from './_common/_services/CurrentBudget.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budgets';

  constructor(private _currentBudgetService: CurrentBudgetService) {}
}
