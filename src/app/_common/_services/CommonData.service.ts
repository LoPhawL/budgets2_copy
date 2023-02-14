import { Injectable } from "@angular/core";
import { collection, onSnapshot, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from "rxjs";
import { FirestoreService } from 'src/app/_common/_services/Firestore.service';
import { INamedDocumentsMap, NamedDocument } from "../_models/INamedDocument";
import { IParsedDocument } from "../_models/IParsedDocument";
import { CategoriesMap, Category } from "../_models/ITransactionCategory";
import { TransactionType, TransactionTypesMap } from "../_models/ITransactionType";

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private _unsubscribe: Unsubscribe[] = [];

  private _categoriesRef = 'categories';
	private _ALL_CATEGORIES: CategoriesMap = {};
  public CATEGORIES_CHANGED = new BehaviorSubject<IParsedDocument<Category>>({keys: [], values: {}, length: 0});

  private _transactionTypesRef = 'transactionTypes';
  private _ALL_TRANSACTIONTYPES: TransactionTypesMap = {};
  public TRANSACTIONTYPES_CHANGED = new BehaviorSubject<IParsedDocument<TransactionType>>({keys: [], values: {}, length: 0});

  constructor(
    private _fsService: FirestoreService,
    private _toastr: ToastrService
  ) {

    const unsubscribeCategories = onSnapshot<CategoriesMap>(collection(this._fsService.db, this._categoriesRef), (col: QuerySnapshot<CategoriesMap>) => {
      this.serializeNamedDocumentsInCollectionAndEmit<CategoriesMap, Category>
        (col, this._ALL_CATEGORIES, 'category', this.CATEGORIES_CHANGED);
    });
    this._unsubscribe.push(unsubscribeCategories);

    const unsubscribeTransactionTypes = onSnapshot<TransactionTypesMap>(collection(this._fsService.db, this._transactionTypesRef), (col: QuerySnapshot<TransactionTypesMap>) => {
      this.serializeNamedDocumentsInCollectionAndEmit<TransactionTypesMap, TransactionType>
        (col, this._ALL_TRANSACTIONTYPES, 'transaction type', this.TRANSACTIONTYPES_CHANGED);
    });
    this._unsubscribe.push(unsubscribeTransactionTypes);
  }

  private serializeNamedDocumentsInCollectionAndEmit<T, T1 extends NamedDocument>(
      col: QuerySnapshot<T>,
      localDataStore: INamedDocumentsMap<T1>,
      entityName: string,
      emittable: BehaviorSubject<IParsedDocument<T1>>
    ) {
    for (let docChange of col.docChanges()) {
      const doc = docChange.doc;
      if (docChange.type === 'removed') {
        this._toastr.info(`The ${entityName.toLowerCase()} '${localDataStore[doc.id].name}' is deleted.`);
        delete localDataStore[doc.id];
      } else if (localDataStore[doc.id]) {
        localDataStore[doc.id] = doc.data({}) as unknown as T1;
        this._toastr.info(`The ${entityName.toLowerCase()} '${localDataStore[doc.id].name}' just got updated.`);
      } else {
        localDataStore[doc.id] = doc.data() as unknown as T1;
      }
    }
    const keys = Object.keys(localDataStore);
    emittable.next({ keys, values: localDataStore, length: keys.length });
  }

  onDestroy() {
    for (let unsubscribable of this._unsubscribe) {
      unsubscribable();
    }
  }

}
