import { Injectable } from "@angular/core";
import { collection, onSnapshot, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from "rxjs";
import { FirestoreService } from 'src/app/_common/_services/Firestore.service';
import { INamedDocument, INamedDocumentMap } from "../_models/INamedDocument";
import { ICategoriesMap, ICategory } from "../_models/ITransactionCategory";
import { ITransactionType, ITransactionTypeMap } from "../_models/ITransactionType";

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private _unsubscribe: Unsubscribe[] = [];

  private _categoriesRef = 'categories';
	private _ALL_CATEGORIES: ICategoriesMap = {};
  public CATEGORIES_CHANGED = new BehaviorSubject<ICategoriesMap>({});

  private _transactionTypesRef = 'transactionTypes';
  private _ALL_TRANSACTIONTYPES: ITransactionTypeMap = {};
  public TRANSACTIONTYPES_CHANGED = new BehaviorSubject<ITransactionTypeMap>({});

  constructor(
    private _fsService: FirestoreService,
    private _toastr: ToastrService
  ) {

    const unsubscribeCategories = onSnapshot<ICategoriesMap>(collection(this._fsService.db, this._categoriesRef), (col: QuerySnapshot<ICategoriesMap>) => {
      // for (let docChange of col.docChanges()) {
      //   const doc = docChange.doc;
      //   if (docChange.type === 'removed') {
      //     this._toastr.info(`The category '${this._ALL_CATEGORIES[doc.id].name}' is deleted.`);
      //     delete this._ALL_CATEGORIES[doc.id];
      //   } else if (this._ALL_CATEGORIES[doc.id]) { // update
      //     // showing toastr notification here as there is no bulk update possible yet.
      //     this._ALL_CATEGORIES[doc.id] = doc.data();
      //     this._toastr.info(`The category '${this._ALL_CATEGORIES[doc.id].name}' just got updated.`);
      //   } else {
      //     this._ALL_CATEGORIES[doc.id] = doc.data();
      //   }
      // }
      // this.CATEGORIES_CHANGED.next(this._ALL_CATEGORIES);
      this.serializeNamedDocumentsInCollectionAndEmit<ICategory, ICategoriesMap>(col, this._ALL_CATEGORIES, 'category', this.CATEGORIES_CHANGED);
    });
    this._unsubscribe.push(unsubscribeCategories);

    const unsubscribeTransactionTypes = onSnapshot<ITransactionTypeMap>(collection(this._fsService.db, this._transactionTypesRef), (col: QuerySnapshot<ITransactionTypeMap>) => {
      this.serializeNamedDocumentsInCollectionAndEmit<ITransactionType, ITransactionTypeMap>(col, this._ALL_TRANSACTIONTYPES, 'category', this.TRANSACTIONTYPES_CHANGED);
    });
    this._unsubscribe.push(unsubscribeTransactionTypes);
  }

  private serializeNamedDocumentsInCollectionAndEmit<T1 extends INamedDocument, T extends INamedDocumentMap<T1>>(col: QuerySnapshot<T>, localDataStore: INamedDocumentMap<T1>, entityName: string, emittable: BehaviorSubject<INamedDocumentMap<T1>>) {
    for (let docChange of col.docChanges()) {
      const doc = docChange.doc;
      if (docChange.type === 'removed') {
        this._toastr.info(`The ${entityName.toLowerCase()} '${localDataStore[doc.id].name}' is deleted.`);
        delete localDataStore[doc.id];
      } else if (localDataStore[doc.id]) {
        localDataStore[doc.id] = doc.data() as unknown as T1;
        this._toastr.info(`The ${entityName.toLowerCase()} '${localDataStore[doc.id].name}' just got updated.`);
      } else {
        localDataStore[doc.id] = doc.data() as unknown as T1;
      }
    }
    emittable.next(localDataStore);
  }

  onDestroy() {
    for (let unsubscribable of this._unsubscribe) {
      unsubscribable();
    }
  }

}
