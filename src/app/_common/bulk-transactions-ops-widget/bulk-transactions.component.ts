import { Component, OnInit } from '@angular/core';
import { faMoneyBillWave, faX } from '@fortawesome/free-solid-svg-icons';
import { TransactionOperationsService } from '../_services/TransactionOperations.service';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { BulkOperationsInterfaceComponent } from '../bulk-operations-interface/bulk-operations-interface.component';


@Component({
  selector: 'app-bulk-transactions',
  templateUrl: './bulk-transactions.component.html',
  styleUrls: ['./bulk-transactions.component.scss']
})
export class BulkTransactionsComponent implements OnInit {

  public icon = faMoneyBillWave;
  public closeIcon = faX;

  public selectedTransactionsCount: number = 0;

  constructor(private _transOpsService: TransactionOperationsService, private _offCanvasService: NgbOffcanvas) {}

  ngOnInit() {
    this._transOpsService.transactionsSelectionChanged.subscribe(data => {

      this.selectedTransactionsCount = data.allSelectedTransactions.length;
    })
  }

  clearSelectedTransactions() {
    this._transOpsService.deselectTransactions();
  }

  showBulkOpsCanvas() {
    this._offCanvasService.open(BulkOperationsInterfaceComponent, { scroll: true, position: 'end' })
  }
}
