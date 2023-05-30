import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { ITransaction } from '../_models/ITransaction';
import { TransactionOperationsService } from '../_services/TransactionOperations.service';

@Component({
  selector: 'app-transactions-display',
  templateUrl: './transactions-display.component.html',
  styleUrls: ['./transactions-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsDisplayComponent implements OnInit {

  @Input()
  public transaction: Partial<ITransaction> = {};

  @Input()
  public order: number = -1;

  protected selected: boolean = false;

  constructor(private _transactionOperationsService: TransactionOperationsService, private _changeDtcRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this._transactionOperationsService.transactionsSelectionChanged.subscribe(
      data => {
        if (data.type === 'deselected' && !data.allSelectedTransactions.length) {
          if (this.selected) {
            this._changeDtcRef.markForCheck();
          }
          this.selected = false;
        }
      }
    )
  }

  getDate(dt: Date | Timestamp) {
    return (dt as Timestamp).toDate()
  }

  selectionChanged(selected: boolean) {
    if (selected) {
      this._transactionOperationsService.selectTransactions([this.transaction]);
    } else {
      this._transactionOperationsService.deselectTransactions([this.transaction]);
    }
  }
}
