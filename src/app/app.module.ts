import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { CurrencyService } from './_common/_services/Currency.service';
import { CurrentBudgetService } from './_common/_services/CurrentBudget.service';
import { AppCommonModule } from './_common/Common.module';
import { CategoriesModule } from './categories/Categories.module';
import { DashboardModule } from './dash/Dashboard.module';
import { SettingsModule } from './settings/Settings.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    AppCommonModule,
    CategoriesModule,
    DashboardModule,
    SettingsModule,

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
