import { Component } from '@angular/core';
import { collection, onSnapshot } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { FirestoreService } from 'src/app/_common/_services/Firestore.service';
import { faSterlingSign, faInr, faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from 'src/app/_common/_services/Currency.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {

  allIcons: any = {
    faSterlingSign,
    faInr
  }

  icons = {
    currency: undefined,
    expense: faArrowRightFromBracket,
    income: faArrowRightToBracket
  }

  page = 1;
	pageSize = 8;
	collectionSize = 0;
	categories: any;
	private _ALL_CATEGORIES: any = {};
  private _unsubscribe: any = [];

  private _categoriesRef = 'categories';

  constructor(
    private _fsService: FirestoreService,
    private _toastr: ToastrService,
    private _currencyService: CurrencyService
  ) {}

  ngOnInit() {
    const snapshot = onSnapshot(collection(this._fsService.db, this._categoriesRef), (col) => {
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
      this.collectionSize = Object.keys(this._ALL_CATEGORIES).length;
      this.refreshCategories();
    });
    this._unsubscribe.push(snapshot);

    this._currencyService.currencyIcon.subscribe(icon => {
      this.icons.currency = this.allIcons[icon];
    });
  }

	refreshCategories() {
		const keysToDisplay = Object.keys(this._ALL_CATEGORIES).sort().slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
    this.categories = keysToDisplay.map(key => this._ALL_CATEGORIES[key])
	}

  onDestroy() {
    for (let unsubscribable of this._unsubscribe) {
      unsubscribable.unsubscribe();
    }
  }

}
