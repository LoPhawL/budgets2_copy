import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { CurrentBudgetService } from './_common/_services/CurrentBudget.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Budgets' + environment.titleSuffix;

  constructor(private _currentBudgetService: CurrentBudgetService, private _titleService: Title) {
    this._titleService.setTitle(this.title);
  }
}
