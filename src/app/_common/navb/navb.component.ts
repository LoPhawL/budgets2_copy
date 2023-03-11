import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navb',
  templateUrl: './navb.component.html',
  styleUrls: ['./navb.component.scss']
})
export class NavbComponent {
  public faCircleArrowRight = faCircleArrowRight;
  public currentPage: string = '';

  constructor(private _router: Router) {
    this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(dt => {
      this.currentPage = (dt as NavigationEnd).url;
    })
  }
}
