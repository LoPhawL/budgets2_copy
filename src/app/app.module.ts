import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashComponent } from './dash/dash.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CurrencyService } from './_common/_services/Currency.service';
import { CurrentBudgetService } from './_common/_services/CurrentBudget.service';
import { CategoriesMetricsComponent } from './dash/categories-metrics/categories-metrics.component';
import { MetricsCarouselComponent } from './dash/metrics-carousel/metrics-carousel.component';
import { CategoryExpensesComponent } from './dash/categories-metrics/category-expenses/category-expenses.component';
import { SettingsComponent } from './settings/settings.component';
import { FirstCarouselComponent } from './dash/metrics-carousel/first-carousel/first-carousel.component';
import { SecondCarouselComponent } from './dash/metrics-carousel/second-carousel/second-carousel.component';
import { AccountsBalanceCardComponent } from './dash/metrics-carousel/cards/accounts-balance-card/accounts-balance-card.component';
import { TransactionMetaReferenceCardComponent } from './dash/metrics-carousel/cards/transaction-meta-reference-card/transaction-meta-reference-card.component';
import { CardHostDirective } from './dash/metrics-carousel/_directives/CardHost';
import { AppCommonModule } from './_common/Common.module';
import { CategoriesModule } from './categories/Categories.module';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,

    CategoriesMetricsComponent,
    MetricsCarouselComponent,
    CategoryExpensesComponent,
    SettingsComponent,
    FirstCarouselComponent,
    SecondCarouselComponent,
    AccountsBalanceCardComponent,
    TransactionMetaReferenceCardComponent,
    CardHostDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    AppCommonModule,
    CategoriesModule,

    NgbModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    CurrencyService,
    CurrentBudgetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
