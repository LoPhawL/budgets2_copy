import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgbDropdownModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddCategoryPopupComponent } from '../popups/add-category-popup/add-category-popup.component';
import { AddTransactionPopupComponent } from '../popups/add-transaction-popup/add-transaction-popup.component';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  imports: [NgbDropdownModule, FontAwesomeModule],
  standalone: true
})
export class FabComponent {
  faPlusCircle = faPlusCircle;

  constructor(private _modalService: NgbModal, private _toastr: ToastrService,) {

  }

  AddTransaction() {

    const modalRef = this._modalService.open(AddTransactionPopupComponent);
    modalRef.closed.subscribe(result => {
      if (result === 'added') {
        this._toastr.info('Transaction added successfully.');
      }
    });
  }

  AddCategory() {

    const modalRef = this._modalService.open(AddCategoryPopupComponent);
    modalRef.closed.subscribe(result => {
      this._toastr.info('Category added successfully.');
    });
  }
}
