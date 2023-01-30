import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashComponent } from './dash/dash.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExpenditureBarComponent } from './expenditure-bar/expenditure-bar.component';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CurrencyService } from './_common/_services/Currency.service';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    ExpenditureBarComponent,
    CategoriesComponent,
    CategoriesListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    CurrencyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
