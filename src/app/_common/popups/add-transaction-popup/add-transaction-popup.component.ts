import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CategoriesMap } from '../../_models/ITransactionCategory';
import { TransactionTypesMap } from '../../_models/ITransactionType';
import { CommonDataService } from '../../_services/CommonData.service';

@Component({
  selector: 'app-add-transaction-popup',
  templateUrl: './add-transaction-popup.component.html',
  styleUrls: ['./add-transaction-popup.component.scss']
})
export class AddTransactionPopupComponent implements OnInit, OnDestroy {

  ALL_TRANSACTIONTYPES: string[] = [];
  ALL_CATEGORIES: string[] = [];

  transactionType: string = '';
  transAmount: number = 0;

  unsubscribeNotifier = new Subject();

  constructor(private _dataService: CommonDataService) {}

  ngOnInit() {
    this._dataService.TRANSACTIONTYPES_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( transactionTypes => {
      console.log(transactionTypes);
    });

    this._dataService.CATEGORIES_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( categories => {
      console.log(categories);
    });
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next(null);
  }

  Submit(transForm: NgForm) {}

}
