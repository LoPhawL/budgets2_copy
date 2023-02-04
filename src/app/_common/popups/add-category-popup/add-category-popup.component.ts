import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { doc, setDoc } from '@firebase/firestore';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from '../../_services/Firestore.service';

@Component({
  selector: 'app-add-category-popup',
  templateUrl: './add-category-popup.component.html',
  styleUrls: ['./add-category-popup.component.scss']
})
export class AddCategoryPopupComponent {

  catName: string = '';
  categoryMaxBudget: number = 0;
  categoryDescription: string = '';

	constructor(public activeModal: NgbActiveModal, public _firestoreService: FirestoreService) {}

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
        transactionType: 'exp'
      }
    );

    this.activeModal.close('saved');
  }
}
