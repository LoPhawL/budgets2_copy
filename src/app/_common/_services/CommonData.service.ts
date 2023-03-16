import { Injectable } from "@angular/core";
import { collection, onSnapshot, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject, Subject } from "rxjs";
import { FirestoreService } from 'src/app/_common/_services/Firestore.service';
import { IParsedDocument } from "../_models/IParsedDocument";
import { ITransaction, ITransactionsMap } from "../_models/ITransaction";
import { CategoriesMap, Category } from "../_models/TransactionCategory";
import { TransactionType, TransactionTypesMap } from "../_models/TransactionType";
import { CurrentBudgetService } from "./CurrentBudget.service";
import { SerializerService } from "./Serializer.service";

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private _unsubscribe: Unsubscribe[] = [];

  private _categoriesRef = 'categories';
	private _ALL_CATEGORIES: CategoriesMap = {};
  public CATEGORIES_CHANGED = new BehaviorSubject<IParsedDocument<Category>>({keys: [], values: {}, length: 0, raw: []});

  private _transactionTypesRef = 'transactionTypes';
  private _ALL_TRANSACTIONTYPES: TransactionTypesMap = {};
  public TRANSACTIONTYPES_CHANGED = new BehaviorSubject<IParsedDocument<TransactionType>>({keys: [], values: {}, length: 0, raw: []});

  private _transactionsRef = 'transactions';
  private _ALL_TRANSACTIONS: ITransactionsMap = {};
  public  TRANSACTIONS_CHANGED = new BehaviorSubject<IParsedDocument<ITransaction>>({keys: [], values: {}, length: 0, raw: []});

  // public newTransactionCommitted = new Subject<Partial<ITransaction>>();

  constructor(
    private _fsService: FirestoreService,
    private _serializerService: SerializerService,
    private _currentBudgetService: CurrentBudgetService
  ) {

    const unsubscribeCategories = onSnapshot<CategoriesMap>(collection(this._fsService.db, this._categoriesRef), (col: QuerySnapshot<CategoriesMap>) => {
      this._serializerService.serializeDocumentsInCollectionAndEmit<CategoriesMap, Category>
        (col, this._ALL_CATEGORIES, 'category', this.CATEGORIES_CHANGED);
    });
    this._unsubscribe.push(unsubscribeCategories);

    const unsubscribeTransactionTypes = onSnapshot<TransactionTypesMap>(collection(this._fsService.db, this._transactionTypesRef), (col: QuerySnapshot<TransactionTypesMap>) => {
      this._serializerService.serializeDocumentsInCollectionAndEmit<TransactionTypesMap, TransactionType>
        (col, this._ALL_TRANSACTIONTYPES, 'transaction type', this.TRANSACTIONTYPES_CHANGED);
    });
    this._unsubscribe.push(unsubscribeTransactionTypes);

    const unsubscribeTransactions = onSnapshot(collection(this._fsService.db, this._currentBudgetService.currentBudgetRef, this._transactionsRef), (col => {
      this._serializerService.serializeDocumentsInCollectionAndEmit<ITransactionsMap, ITransaction>
        (col, this._ALL_TRANSACTIONS, 'transactions', this.TRANSACTIONS_CHANGED);
    }));
    this._unsubscribe.push(unsubscribeTransactions)
  }

  onDestroy() {
    for (let unsubscribable of this._unsubscribe) {
      unsubscribable();
    }
  }

}
