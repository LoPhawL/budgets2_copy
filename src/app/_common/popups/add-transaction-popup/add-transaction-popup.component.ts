import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-transaction-popup',
  templateUrl: './add-transaction-popup.component.html',
  styleUrls: ['./add-transaction-popup.component.scss']
})
export class AddTransactionPopupComponent {

  transAmount: number = 0;

  Submit(transForm: NgForm) {

  }
}
