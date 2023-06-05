import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { TransactionOperationsService } from './_common/_services/TransactionOperations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Budgets' + environment.titleSuffix;
  showTransOpsWidget: boolean = false;

  constructor(private _transOpsService: TransactionOperationsService, private _titleService: Title) {
    this._titleService.setTitle(this.title);
  }

  ngOnInit() {

    this._transOpsService.transactionsSelectionChanged.subscribe(data => {
      this.showTransOpsWidget = !!data.allSelectedTransactions.length;
    })
  }
}
