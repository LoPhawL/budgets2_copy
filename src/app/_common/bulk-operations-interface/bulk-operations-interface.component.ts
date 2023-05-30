import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bulk-operations-interface',
  templateUrl: './bulk-operations-interface.component.html',
  styleUrls: ['./bulk-operations-interface.component.scss']
})
export class BulkOperationsInterfaceComponent implements OnInit {

  constructor(private _offCanvasService: NgbOffcanvas) {

  }

  ngOnInit() {
    setTimeout(() => {
      this._offCanvasService.dismiss();
    }, 10);
  }
}
