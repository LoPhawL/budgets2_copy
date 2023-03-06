import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashComponent } from './dash/dash.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { ExpenditureBarComponent } from './expenditure-bar/expenditure-bar.component';
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
import { MetricsCardsListComponent } from './dash/metrics-cards-list/metrics-cards-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    // ExpenditureBarComponent,
    CategoriesComponent,
    CategoriesListComponent,
    AddCategoryPopupComponent,
    AddTransactionPopupComponent,
    CurrencySymbolComponent,
    CategoriesMetricsComponent,
    MetricsCardsListComponent,
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
