import { Component } from '@angular/core';
import { collection, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { FirestoreService } from '../_common/_services/Firestore.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  page = 1;
	pageSize = 4;
	collectionSize = 0;
	categories: any;
	private _ALL_CATEGORIES: any = [];

  private _categoriesRef = 'categories';

  constructor(private _fsService: FirestoreService) {}

  ngOnInit() {
    onSnapshot(collection(this._fsService.db, this._categoriesRef), (col) => {
      this._ALL_CATEGORIES = [];
      for (let doc of col.docs) {
        this._ALL_CATEGORIES.push(doc.data());
      }
      this.collectionSize = this._ALL_CATEGORIES.length;
      this.refreshCategories();
    });
  }

	refreshCategories() {

		this.categories = this._ALL_CATEGORIES.slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
	}
}
