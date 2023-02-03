import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddCategoryPopupComponent } from '../_common/popups/add-category-popup/add-category-popup.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  constructor(private modalService: NgbModal) {
  }

  AddCategory() {

    const modalRef = this.modalService.open(AddCategoryPopupComponent);
		modalRef.componentInstance.name = 'He hoo';
  }

}
