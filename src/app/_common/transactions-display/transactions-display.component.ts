import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Timestamp } from 'firebase/firestore';
import { ITransaction } from '../_models/ITransaction';

@Component({
  selector: 'app-transactions-display',
  templateUrl: './transactions-display.component.html',
  styleUrls: ['./transactions-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionsDisplayComponent {

  @Input()
  public transaction: Partial<ITransaction> = {};

  @Input()
  public order: number = -1;

  getDate(dt: Date | Timestamp) {
    return (dt as Timestamp).toDate()
  }

  selectionChanged(selected: boolean) {
    if (selected) {

    } else {

    }
  }
}
