import { Injectable } from "@angular/core";
import { collection, onSnapshot, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from "rxjs";
import { FirestoreService } from 'src/app/_common/_services/Firestore.service';
import { INamedDocumentsMap, NamedDocument } from "../_models/INamedDocument";
import { IParsedDocument } from "../_models/IParsedDocument";
import { CategoriesMap, Category } from "../_models/TransactionCategory";
import { TransactionType, TransactionTypesMap } from "../_models/TransactionType";
import { SerializerService } from "./Serializer.service";

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
    private _serializerService: SerializerService
  ) {

    const unsubscribeCategories = onSnapshot<CategoriesMap>(collection(this._fsService.db, this._categoriesRef), (col: QuerySnapshot<CategoriesMap>) => {
      this._serializerService.serializeNamedDocumentsInCollectionAndEmit<CategoriesMap, Category>
        (col, this._ALL_CATEGORIES, 'category', this.CATEGORIES_CHANGED);
    });
    this._unsubscribe.push(unsubscribeCategories);

    const unsubscribeTransactionTypes = onSnapshot<TransactionTypesMap>(collection(this._fsService.db, this._transactionTypesRef), (col: QuerySnapshot<TransactionTypesMap>) => {
      this._serializerService.serializeNamedDocumentsInCollectionAndEmit<TransactionTypesMap, TransactionType>
        (col, this._ALL_TRANSACTIONTYPES, 'transaction type', this.TRANSACTIONTYPES_CHANGED);
    });
    this._unsubscribe.push(unsubscribeTransactionTypes);
  }

  onDestroy() {
    for (let unsubscribable of this._unsubscribe) {
      unsubscribable();
    }
  }

}
