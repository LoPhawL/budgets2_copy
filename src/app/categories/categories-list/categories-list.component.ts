import { Component } from '@angular/core';
import { faSterlingSign, faInr, faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { CurrencyService } from 'src/app/_common/_services/Currency.service';
import { ICategoriesMap, ICategory } from 'src/app/_common/_models/ITransactionCategory';
import { CommonDataService } from 'src/app/_common/_services/CommonData.service';

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
	categories: Partial<ICategory>[] = [];
	private _ALL_CATEGORIES: ICategoriesMap = {};

  constructor(
    private _currencyService: CurrencyService,
    private _commonDataService: CommonDataService
  ) {}

  ngOnInit() {

    this._currencyService.currencyIcon.subscribe(icon => {
      this.icons.currency = this.allIcons[icon];
    });

    this._commonDataService.CATEGORIES_CHANGED.subscribe(
      all_categories => {
        this._ALL_CATEGORIES = all_categories;
        this.collectionSize = Object.keys(this._ALL_CATEGORIES).length;
        this.refreshCategories();
      }
    );

  }

	refreshCategories() {
		const keysToDisplay = Object.keys(this._ALL_CATEGORIES).sort().slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize,
		);
    this.categories = keysToDisplay.map(key => this._ALL_CATEGORIES[key])
	}
}
