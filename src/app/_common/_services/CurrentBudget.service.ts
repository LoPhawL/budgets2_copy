import { Injectable } from "@angular/core";
import { collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  onSnapshot,
  setDoc,
  Unsubscribe,
  WriteBatch
} from "firebase/firestore";
import { BehaviorSubject } from "rxjs";
import { BudgetSettings } from "../_models/BudgetSettings";
import { CurrentBudgetSettings } from "../_models/CurrentBudgetSettings";
import { ITransaction } from "../_models/ITransaction";
import { AccountsService } from "./Accounts.service";
import { FirestoreService } from "./Firestore.service";

@Injectable()
export class CurrentBudgetService {

  private _budgetMonth: string;
  public readonly currentBudgetRef: string;
  public readonly currentBudgetFsDocRef: DocumentReference<DocumentData>;

  public budgetInitiated = new BehaviorSubject<string>('');
  public budgetSettingsUpdated = new BehaviorSubject<Partial<{id: string, currentBudgetSettings: BudgetSettings}>>({});

  public budgetSettings: CurrentBudgetSettings;

  private _unsubscribe: Unsubscribe[] = [];

  constructor(private _fsService: FirestoreService, private _accountsService: AccountsService) {

    const date = new Date();
    this._budgetMonth = date.getMonth() + '' + date.getFullYear();
    this.currentBudgetRef = 'budgets/' + this._budgetMonth;

    this.budgetSettings = new CurrentBudgetSettings();

    // check if the budget exists for the current month
    this.currentBudgetFsDocRef = doc(this._fsService.db, this.currentBudgetRef);
    getDoc(this.currentBudgetFsDocRef)
    .then(currentBudgetDocSnap => {
      if (!currentBudgetDocSnap.exists()) { // not exists
        return setDoc(this.currentBudgetFsDocRef, {});
      }
      throw 'promise_exit';
    })
    .then( val => {
      // set initial snapshot
      const accSubscription = this._accountsService.ACCOUNTS_CHANGED;
      const accData = accSubscription.getValue();
      accSubscription.unsubscribe();

      const accSnapshot: any = {};
      for (let key of accData.keys) {
        accSnapshot[key] = {
          balance: accData.values[key].balance
        }
      }
      const metaRef = doc(collection(this._fsService.db, this.currentBudgetRef, 'initialSnapshot'), 'accounts');

      return setDoc(metaRef, accSnapshot);
    })
    .then( () => {
      // add budget settings
      const emptySettings = this.budgetSettings.getEmptySettings();
      const settings = [];
      for (let key of Object.keys(emptySettings)) {

        const settingsRef = doc(collection(this._fsService.db, this.currentBudgetRef, 'settings'), key);
        settings.push(setDoc(settingsRef, emptySettings[key]));
      }

      return Promise.all(settings);
    })
    .then( () => {
      this.budgetInitiated.next(this._budgetMonth);
    })
    .catch( err=> {
      if (err === 'promise_exit') {
        // expected error
      } else {
        throw err;
      }
    });

    // NEED TO: strongly type the below subscription
    const unsubscribeTransactions = onSnapshot(collection(this._fsService.db, this.currentBudgetRef, 'settings'), ( col => {
      col.docChanges().forEach( docRef => {
        const doc = docRef.doc;

        if (['added', 'modified'].includes(docRef.type)) {

          this.budgetSettings.set(doc.id, doc.data());
        } //else if (docRef.type === 'removed') {
        //   // currentBudgetSettings.unSet(doc.id);
        // }
        // this.budgetSettingsUpdated.next({ id: doc.id, currentBudgetSettings });
      });
    }));
    this._unsubscribe.push(unsubscribeTransactions);

    // onSnapshot(, (col) => {
    //   col.docChanges().forEach(doc => console.log(doc.doc.data()));
    // })
  }

  saveTransaction(transaction: Partial<ITransaction>, batch: WriteBatch) {

    const id = transaction.date?.getTime() + '';
    batch.set(doc(collection(this._fsService.db, this.currentBudgetRef, 'transactions'), id), transaction);
  }

  onDestroy() {
    for (let unsubscribable of this._unsubscribe) {
      unsubscribable();
    }
  }
}
