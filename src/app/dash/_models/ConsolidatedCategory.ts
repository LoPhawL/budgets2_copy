import { DocumentChangeType } from "firebase/firestore";
import { ITransaction } from "src/app/_common/_models/ITransaction";

export class ConsolidatedCategory {
  public categoryId: string;
  public transactions: ITransaction[];
  public categoryTotal: number;
  public transactionType: string = '';

  constructor(categoryId: string) {
    this.categoryId = categoryId;
    this.transactions = [];
    this.categoryTotal = 0;
    // this.transactionType = transactionType;
  }

  addTransaction(transaction: ITransaction, mode: DocumentChangeType, totalExpenses: { value: number }) {

    // if (!transaction.category || transaction.category === this.categoryId) { //remove this if condition
      if (mode === 'added') {
        this.transactions.push(transaction);

        this.categoryTotal += transaction.amount;
        totalExpenses.value += transaction.amount;
      } else if (mode === 'removed') {
        const transInStore = this.transactions.find(trans => trans.id === transaction.id)!;
        const index = this.transactions.indexOf(transInStore);
        this.transactions.splice(index, 1);

        this.categoryTotal -= transaction.amount;
        totalExpenses.value -= transaction.amount;
      } else {
        const transInStore = this.transactions.find(trans => trans.id === transaction.id)!;
        const index = this.transactions.indexOf(transInStore);

        const oldAmount = transInStore.amount;
        const newAmount = transaction.amount;

        this.transactions.splice(index, 1);
        this.transactions.push(transaction);

        if(oldAmount !== newAmount) {
          this.categoryTotal -= oldAmount;
          this.categoryTotal += newAmount;

          totalExpenses.value -= oldAmount;
          totalExpenses.value += newAmount;
        }
      }
    // }
  }
}
