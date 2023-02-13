import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddCategoryPopupComponent } from '../_common/popups/add-category-popup/add-category-popup.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor(private _modalService: NgbModal, private _toastr: ToastrService) {
  }

  AddCategory() {

    const modalRef = this._modalService.open(AddCategoryPopupComponent);
    modalRef.closed.subscribe(result => {
      this._toastr.info('Category added successfully.');
    });
  }
}
