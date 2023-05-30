import { Component, OnInit } from '@angular/core';
import { faMoneyBillWave, faX } from '@fortawesome/free-solid-svg-icons';
import { TransactionOperationsService } from '../_services/TransactionOperations.service';


@Component({
  selector: 'app-bulk-transactions',
  templateUrl: './bulk-transactions.component.html',
  styleUrls: ['./bulk-transactions.component.scss']
})
export class BulkTransactionsComponent implements OnInit {

  public icon = faMoneyBillWave;
  public closeIcon = faX;

  public selectedTransactionsCount: number = 0;

  constructor(private _transOpsService: TransactionOperationsService) {}

  ngOnInit() {
    this._transOpsService.transactionsSelectionChanged.subscribe(data => {

      this.selectedTransactionsCount = data.allSelectedTransactions.length;
      console.log(data);

    })
  }

  clearSelectedTransactions() {
    this._transOpsService.deselectTransactions();
  }

}
