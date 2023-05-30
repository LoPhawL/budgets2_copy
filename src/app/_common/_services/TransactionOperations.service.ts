import { Injectable } from "@angular/core";
import { ITransaction } from "../_models/ITransaction";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TransactionOperationsService {

  private readonly _selectedTransactions: Partial<ITransaction>[] = [];

  public transactionsSelectionChanged = new BehaviorSubject<{
    type: 'selected' | 'deselected' | 'initial',
    transactions: Partial<ITransaction>[],
    allSelectedTransactions: Partial<ITransaction>[]
  }>({ type: 'initial', transactions: [], allSelectedTransactions: this._selectedTransactions});

  public selectTransactions(transactions: Partial<ITransaction>[]) {

    const addedTransactions: Partial<ITransaction>[] = [];
    transactions.forEach(trans => {
      if (!this._selectedTransactions.includes(trans)) {
        this._selectedTransactions.push(trans);
        addedTransactions.push(trans);
      }
    });
    if (addedTransactions.length) {
      this.transactionsSelectionChanged.next({
        type: 'selected',
        transactions,
        allSelectedTransactions: this._selectedTransactions
      });
    }
  }

  public deselectTransactions(transactions?: Partial<ITransaction>[]) {

    if (!transactions) {

      this._selectedTransactions.splice(0, this._selectedTransactions.length);
      this.transactionsSelectionChanged.next({
        type: 'deselected',
        transactions: [],
        allSelectedTransactions: this._selectedTransactions
      });
    } else {
      const removedTransactions: Partial<ITransaction>[] = [];
      transactions.forEach(trans => {
        if (this._selectedTransactions.includes(trans)) {
          this._selectedTransactions.splice(this._selectedTransactions.indexOf(trans), 1);
          removedTransactions.push(trans);
        }
      });
      if (removedTransactions.length) {
        this.transactionsSelectionChanged.next({
          type: 'deselected',
          transactions: removedTransactions,
          allSelectedTransactions: this._selectedTransactions
        });
      }
    }
  }

  public getSelectedTransactions() {

    return this._selectedTransactions;
  }

}
