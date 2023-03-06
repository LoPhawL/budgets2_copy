import { Component } from '@angular/core';
import { faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
// import { ICategoriesMap, ICategory } from 'src/app/_common/_models/ITransactionCategory';
import { CommonDataService } from 'src/app/_common/_services/CommonData.service';
import { CategoriesMap, Category } from 'src/app/_common/_models/TransactionCategory';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent {

 

  icons = {
    // currency: undefined,
    expense: faArrowRightFromBracket,
    income: faArrowRightToBracket
  }

  page = 1;
	pageSize = 8;
	collectionSize = 0;
	categories: Partial<Category>[] = [];
	private _ALL_CATEGORIES: CategoriesMap = {};
  private _categoryKeys: string[] = [];

  constructor(    
    private _commonDataService: CommonDataService
  ) {}

  ngOnInit() {    

    this._commonDataService.CATEGORIES_CHANGED.subscribe(
      categoriesData => {
        this._ALL_CATEGORIES = categoriesData.values;
        this.collectionSize = categoriesData.length;
        this._categoryKeys = categoriesData.keys;
        this.refreshCategories();
      }
    );

  }

	refreshCategories() {

		const keysToDisplay = this._categoryKeys.sort().slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
    this.categories = keysToDisplay.map(key => this._ALL_CATEGORIES[key])
	}
}
