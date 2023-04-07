import { Component } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { ICurrentBudgetSettings } from 'src/app/_common/_models/CurrentBudgetSettings';
import { CurrentBudgetService } from 'src/app/_common/_services/CurrentBudget.service';

@Component({
  selector: 'app-transaction-meta-reference-card',
  templateUrl: './transaction-meta-reference-card.component.html',
  styleUrls: ['./transaction-meta-reference-card.component.scss']
})
export class TransactionMetaReferenceCardComponent {

  public updatedOn!: Date;
  public currentBudgerSettings?: Partial<ICurrentBudgetSettings>;

  constructor(private _currentBudgetService: CurrentBudgetService) {

  }

  ngOnInit() {
    this._currentBudgetService.budgetSettingsUpdated.subscribe( currentBudgetSettings => {
      this.updatedOn = (currentBudgetSettings!.lastUpdatedOn!.value! as Timestamp).toDate();
    });
  }
}
