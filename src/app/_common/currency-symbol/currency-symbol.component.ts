import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CurrencyService } from '../_services/Currency.service';
import { faSterlingSign, faInr } from '@fortawesome/free-solid-svg-icons';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-currency-symbol',
  templateUrl: './currency-symbol.component.html',
  styleUrls: ['./currency-symbol.component.scss']
})
export class CurrencySymbolComponent implements OnInit, OnDestroy {

  @Input()
  currencyCode: string = '';

  @Input()
  fonsSize: string = '';

  icon: any;
  unsubscribeNotifier = new Subject();

  allIcons: any = {
    faSterlingSign,
    'GBP': faSterlingSign,
    faInr,
    'INR': faInr
  }

  constructor(private _currencyService: CurrencyService) {

  }

  ngOnInit(): void {
    if (this.currencyCode && this.currencyCode !== '') {
      this.icon = this.allIcons[this.currencyCode.toUpperCase()];
    } else {
      this._currencyService.currencyIcon.pipe(takeUntil(this.unsubscribeNotifier)).subscribe(icon => {
        this.icon = this.allIcons[icon];
      });
    }
  }

  getStyle() {
    if (this.fonsSize) {
      return 'font-size: ' + this.fonsSize + 'rem';
    }
    return 'font-size: unset';
  }

  ngOnDestroy(): void {
    this.unsubscribeNotifier.next(null);
  }

}
