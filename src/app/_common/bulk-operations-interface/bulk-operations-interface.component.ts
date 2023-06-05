import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { TransactionOperationsService } from '../_services/TransactionOperations.service';

@Component({
  selector: 'app-bulk-operations-interface',
  templateUrl: './bulk-operations-interface.component.html',
  styleUrls: ['./bulk-operations-interface.component.scss']
})
export class BulkOperationsInterfaceComponent implements OnInit {

  selectedTransactionsCount:number= 0;
  pageTitle:string = "Actions";
  mode: 'add_label' | 'add_to_bill' | '' = '';
  savingLabels: boolean = false;
  
  constructor(private _offCanvasService: NgbOffcanvas, 
    private _transOpsService: TransactionOperationsService) {

  }

  ngOnInit() {
    this._transOpsService.transactionsSelectionChanged.subscribe(data => {

      this.selectedTransactionsCount = data.allSelectedTransactions.length;
    })  
  }

  addLables() {
    // this.addLableEnable = true;
    this.mode = 'add_label';
    this.pageTitle = "Actions - Add Labels";
  }

  addLabelsCancelled() {
    this.mode = '';
  }

  saveLabels(labels: string[]) {
    this.savingLabels = true;
    console.log(labels);

    // if success - savingLables = false, mode = ''
    // else - savingLables = false,

    setTimeout(() => {
      this.savingLabels = false;
    }, 2000);
  }
}
