import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashComponent } from './dash/dash.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ExpenditureBarComponent } from './expenditure-bar/expenditure-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashComponent,
    ExpenditureBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
