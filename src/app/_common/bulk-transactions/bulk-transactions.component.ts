import { Component } from '@angular/core';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-bulk-transactions',
  templateUrl: './bulk-transactions.component.html',
  styleUrls: ['./bulk-transactions.component.scss']
})
export class BulkTransactionsComponent {

  public icon = faMoneyBillWave;

  public selectedTransactionsCount: number = 0;

}
