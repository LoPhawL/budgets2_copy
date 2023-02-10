import { Injectable } from "@angular/core";
import { collection, onSnapshot, QuerySnapshot, Unsubscribe } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from "rxjs";
import { FirestoreService } from 'src/app/_common/_services/Firestore.service';
import { ICategoriesMap, ICategory } from "../_models/ITransactionCategory";

@Injectable({
  providedIn: 'root'
})
export class CommonDataService {

  private _unsubscribe: Unsubscribe[] = [];

  private _categoriesRef = 'categories';
	private _ALL_CATEGORIES: ICategoriesMap = {};

  public CATEGORIES_CHANGED = new BehaviorSubject<ICategoriesMap>({});

  constructor(
    private _fsService: FirestoreService,
    private _toastr: ToastrService
  ) {


    const unsubscribeCategories = onSnapshot<ICategoriesMap>(collection(this._fsService.db, this._categoriesRef), (col: QuerySnapshot<ICategoriesMap>) => {
      for (let docChange of col.docChanges()) {
        const doc = docChange.doc;
        if (docChange.type === 'removed') {
          this._toastr.info(`The category '${this._ALL_CATEGORIES[doc.id].name}' is deleted.`);
          delete this._ALL_CATEGORIES[doc.id];
        } else if (this._ALL_CATEGORIES[doc.id]) { // update
          // showing toastr notification here as there is no bulk update possible yet.
          this._ALL_CATEGORIES[doc.id] = doc.data();
          this._toastr.info(`The category '${this._ALL_CATEGORIES[doc.id].name}' just got updated.`);
        } else {
          this._ALL_CATEGORIES[doc.id] = doc.data();
        }
      }
      this.CATEGORIES_CHANGED.next(this._ALL_CATEGORIES);
    });
    this._unsubscribe.push(unsubscribeCategories);
  }

  onDestroy() {
    for (let unsubscribable of this._unsubscribe) {
      unsubscribable();
    }
  }

}
