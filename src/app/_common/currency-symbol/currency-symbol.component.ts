import { Component, Input, OnDestroy } from '@angular/core';
import { CurrencyService } from '../_services/Currency.service';
import { faSterlingSign, faInr, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-currency-symbol',
  templateUrl: './currency-symbol.component.html',
  styleUrls: ['./currency-symbol.component.scss']
})
export class CurrencySymbolComponent implements OnDestroy {

  @Input()
  currencyCode: string = '';
  icon: any;
  unsubscribeNotifier = new Subject();

  allIcons: any = {
    faSterlingSign,
    faInr
  }

  constructor(private _currencyService: CurrencyService) {
    if (this.currencyCode) {
      this.icon = this.allIcons[this.currencyCode];
    } else {
      this._currencyService.currencyIcon.pipe(takeUntil(this.unsubscribeNotifier)).subscribe(icon => {
        this.icon = this.allIcons[icon];
    });
    }
  }
  ngOnDestroy(): void {
    this.unsubscribeNotifier.next(null);
  }

}
