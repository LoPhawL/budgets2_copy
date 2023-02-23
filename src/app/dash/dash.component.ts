import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AddTransactionPopupComponent } from '../_common/popups/add-transaction-popup/add-transaction-popup.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent {

  constructor(
    private _modalService: NgbModal,
    private _toastr: ToastrService
  ) {
    // this.AddTransaction();
  }

  AddTransaction() {

    const modalRef = this._modalService.open(AddTransactionPopupComponent);
    modalRef.closed.subscribe(result => {
      if (result === 'added') {
        this._toastr.info('Transaction added successfully.');
      }
    });
  }
}
