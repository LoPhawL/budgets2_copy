import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { doc, setDoc } from '@firebase/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { INamedDocumentsMap } from '../../_models/INamedDocument';
import { TransactionType } from '../../_models/TransactionType';
import { CommonDataService } from '../../_services/CommonData.service';
import { FirestoreService } from '../../_services/Firestore.service';

@Component({
  selector: 'app-add-category-popup',
  templateUrl: './add-category-popup.component.html',
  styleUrls: ['./add-category-popup.component.scss']
})
export class AddCategoryPopupComponent {

  catName: string = '';
  categoryMaxBudget: number | null = null;
  categoryDescription: string = '';
  transType: string = 'expense';

  private unsubscribeNotifier = new Subject();
  ALL_TRANSACTIONTYPE_IDS: string[] = [];
  ALL_TRANSACTIONTYPES: INamedDocumentsMap<TransactionType> = {};

	constructor(public activeModal: NgbActiveModal, public _firestoreService: FirestoreService, private _dataService: CommonDataService) {}

  ngOnInit() {
    this._dataService.TRANSACTIONTYPES_CHANGED.pipe(takeUntil(this.unsubscribeNotifier)).subscribe( transactionTypes => {
      this.ALL_TRANSACTIONTYPE_IDS = transactionTypes.keys;
      this.ALL_TRANSACTIONTYPES = transactionTypes.values;
    });
  }

  async Submit(catForm: NgForm) {
    // generate a category key
    // check if a key exists with the same key
    // if exists, make it unique
    this.catName = this.catName.trim();
    this.categoryDescription = this.categoryDescription.trim();
    let key = this.catName.toLowerCase();
    key = key.replace(' ', '_');
    await setDoc(
      doc(this._firestoreService.db, 'categories/' +key),
      {
        name: this.catName,
        description: this.categoryDescription,
        maxMonthly: this.categoryMaxBudget,
        currency: 'GBP',
        transactionType: this.transType
      }
    );

    this.activeModal.close('saved');
  }

  ngOnDestroy() {
    this.unsubscribeNotifier.next(null);
  }
}
