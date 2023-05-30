import { DocumentChangeType } from "firebase/firestore";
import { ITransaction } from "src/app/_common/_models/ITransaction";

export class ConsolidatedCategory {
  public categoryId: string;
  public transactions: ITransaction[];
  public categoryTotal: number;
  public categoryTotalByCurrency: { [currencyKey: string]: number };
  public transactionType: string = '';

  constructor(categoryId: string) {
    this.categoryId = categoryId;
    this.transactions = [];
    this.categoryTotal = 0;
    this.categoryTotalByCurrency = {};
    // this.transactionType = transactionType;
  }

  addTransaction(transaction: ITransaction, mode: DocumentChangeType, totalExpenses: { value: number; [currencyKey: string] : number }) {

      const currency = transaction.accountsAsModifiedByRules ? transaction.accountsAsModifiedByRules[0]?.currency : undefined; // calculate the winning currency if the transactionType is of more than one rule.

      if (mode === 'added') {
        this.transactions.push(transaction);

        if (currency) { // new transaction model
          this.categoryTotalByCurrency[currency] = (this.categoryTotalByCurrency[currency] || 0) + transaction.amount;
          totalExpenses[currency] = (totalExpenses[currency] || 0) + transaction.amount;
        }
        else { // old transaction model
          this.categoryTotal += transaction.amount;
          totalExpenses.value += transaction.amount;
        }
      } else if (mode === 'removed') {
        const transInStore = this.transactions.find(trans => trans.id === transaction.id)!;
        const index = this.transactions.indexOf(transInStore);
        this.transactions.splice(index, 1);

        if (currency) { // new transaction model
          this.categoryTotalByCurrency[currency] = (this.categoryTotalByCurrency[currency] || 0) - transaction.amount;
          totalExpenses[currency] = (totalExpenses[currency] || 0) - transaction.amount;
        }
        else { // old transaction model
          this.categoryTotal -= transaction.amount;
          totalExpenses.value -= transaction.amount;
        }
      } else {
        const transInStore = this.transactions.find(trans => trans.id === transaction.id)!;
        const index = this.transactions.indexOf(transInStore);

        const oldAmount = transInStore.amount;
        const newAmount = transaction.amount;

        this.transactions.splice(index, 1);
        this.transactions.push(transaction);

        if(oldAmount !== newAmount) {
          if (currency) { // new transaction model
            this.categoryTotalByCurrency[currency] = (this.categoryTotalByCurrency[currency] || 0) - oldAmount;
            this.categoryTotalByCurrency[currency] = (this.categoryTotalByCurrency[currency] || 0) + newAmount;

            totalExpenses[currency] = (totalExpenses[currency] || 0) - oldAmount;
            totalExpenses[currency] = (totalExpenses[currency] || 0) + newAmount;
          }
          else { // old transaction model
            this.categoryTotal -= oldAmount;
            this.categoryTotal += newAmount;

            totalExpenses.value -= oldAmount;
            totalExpenses.value += newAmount;
          }
        }
      }
  }
}
