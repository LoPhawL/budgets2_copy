import { Injectable } from "@angular/core";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { BehaviorSubject } from "rxjs";
import { FirestoreService } from "./Firestore.service";

@Injectable()
export class CurrentBudgetService {

  private _budgetMonth: string;
  private _currentBudgetRef: string;

  public budgetInitiated = new BehaviorSubject<string>('');

  constructor(private _fsService: FirestoreService) {

    const date = new Date();
    this._budgetMonth = date.getMonth() + '' + date.getFullYear();
    this._currentBudgetRef = 'budgets/' + this._budgetMonth;

    // check if the budget exists for the current month
    const currentBudgetDocRef = doc(this._fsService.db, this._currentBudgetRef);
    getDoc(currentBudgetDocRef).then(currentBudgetDocSnap => {
      if (currentBudgetDocSnap.exists()) { // exists
        console.log("Document data:", currentBudgetDocSnap.data());
      } else { // not exists
        setDoc(currentBudgetDocRef, {}).then(val => {
          this.budgetInitiated.next(this._budgetMonth);
        });
      }
    });
  }
}
