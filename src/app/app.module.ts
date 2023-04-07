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
import { AddCategoryPopupComponent } from './_common/popups/add-category-popup/add-category-popup.component';
import { AddTransactionPopupComponent } from './_common/popups/add-transaction-popup/add-transaction-popup.component';
import { FabComponent } from './_common/fab/fab.component';
import { CurrencySymbolComponent } from './_common/currency-symbol/currency-symbol.component';
import { CategoriesMetricsComponent } from './dash/categories-metrics/categories-metrics.component';
import { MetricsCarouselComponent } from './dash/metrics-carousel/metrics-carousel.component';
import { NavbComponent } from './_common/navb/navb.component';
import { CategoryExpensesComponent } from './dash/categories-metrics/category-expenses/category-expenses.component';
import { SettingsComponent } from './settings/settings.component';
import { FirstCarouselComponent } from './dash/metrics-carousel/first-carousel/first-carousel.component';
import { SecondCarouselComponent } from './dash/metrics-carousel/second-carousel/second-carousel.component';
import { AccountsBalanceCardComponent } from './dash/metrics-carousel/cards/accounts-balance-card/accounts-balance-card.component';
import { TransactionMetaReferenceCardComponent } from './dash/metrics-carousel/cards/transaction-meta-reference-card/transaction-meta-reference-card.component';
import { CardHostDirective } from './dash/metrics-carousel/_directives/CardHost';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    CategoriesComponent,
    CategoriesListComponent,
    AddCategoryPopupComponent,
    AddTransactionPopupComponent,
    CurrencySymbolComponent,
    CategoriesMetricsComponent,
    MetricsCarouselComponent,
    NavbComponent,
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
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    FabComponent
  ],
  providers: [
    CurrencyService,
    CurrentBudgetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
