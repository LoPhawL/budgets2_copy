import { Component } from '@angular/core';
import { CurrentBudgetService } from './_common/_services/CurrentBudget.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'budgets';
  faPlusCircle = faPlusCircle;

  constructor(private _currentBudgetService: CurrentBudgetService) {}
}
