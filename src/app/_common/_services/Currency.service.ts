import { Injectable } from "@angular/core";
import { doc, onSnapshot } from "firebase/firestore";
import { BehaviorSubject } from "rxjs";
import { FirestoreService } from "./Firestore.service";

@Injectable() // provided in app module
export class CurrencyService {

  public currencyIcon = new BehaviorSubject<string>('');

  // private _unsubscribe = []; // clear off the subscriptions
  private _currenciesRef = 'settings/currency';

  constructor(private _fsService: FirestoreService ) {
    const snapshot = onSnapshot(doc(this._fsService.db, this._currenciesRef), (doc) => {
      this.currencyIcon.next(doc.data()?.['faIcon'] || '');
    });
    // this._unsubscribe.push(snapshot)
  }
}
