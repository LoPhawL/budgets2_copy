import { Injectable } from "@angular/core";
import { doc, DocumentData, DocumentReference, getDoc, setDoc, WriteBatch } from "firebase/firestore";
import { BehaviorSubject } from "rxjs";
import { ITransaction } from "../_models/ITransaction";
import { FirestoreService } from "./Firestore.service";

@Injectable()
export class CurrentBudgetService {

  private _budgetMonth: string;
  public readonly currentBudgetRef: string;
  public readonly currentBudgetFsDocRef: DocumentReference<DocumentData>;

  public budgetInitiated = new BehaviorSubject<string>('');

  constructor(private _fsService: FirestoreService) {

    const date = new Date();
    this._budgetMonth = date.getMonth() + '' + date.getFullYear();
    this.currentBudgetRef = 'budgets/' + this._budgetMonth;

    // check if the budget exists for the current month
    this.currentBudgetFsDocRef = doc(this._fsService.db, this.currentBudgetRef);
    getDoc(this.currentBudgetFsDocRef).then(currentBudgetDocSnap => {
      if (!currentBudgetDocSnap.exists()) { // not exists
        setDoc(this.currentBudgetFsDocRef, {}).then(val => {
          this.budgetInitiated.next(this._budgetMonth);
        });
      } // else { // exists
      //   console.log("Document data:", currentBudgetDocSnap.data());
      // }
    });
  }

  saveTransaction(transaction: Partial<ITransaction>, batch: WriteBatch) {

    // const transactionTypeBasedColRef = this.currentBudgetRef + '/' + transaction.transactionType;
    // const id = collection(this._fsService.db, this.currentBudgetRef, '/', transaction.transactionType). .id;
    const id = transaction.date?.getTime() + '';
    const document: {[key:string]: Partial<ITransaction>} = {};
    document[id] = transaction;
    batch.update(doc(this._fsService.db, this.currentBudgetRef, '/'), document);

    // batch.set(this._fsService, this.currentBudgetRef, {})
  }
}
