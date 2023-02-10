import { Injectable } from "@angular/core";
import { doc, DocumentData, DocumentReference, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { BehaviorSubject } from "rxjs";
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
}
