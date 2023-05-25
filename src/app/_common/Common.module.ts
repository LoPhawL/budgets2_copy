import { NgModule } from "@angular/core";
import { CurrencySymbolComponent } from "./currency-symbol/currency-symbol.component";
import { NavbComponent } from "./navb/navb.component";
import { AddCategoryPopupComponent } from "./popups/add-category-popup/add-category-popup.component";
import { AddTransactionPopupComponent } from "./popups/add-transaction-popup/add-transaction-popup.component";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FabComponent } from "./fab/fab.component";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    FabComponent
  ],
  declarations: [
    CurrencySymbolComponent,
    NavbComponent,
    AddCategoryPopupComponent,
    AddTransactionPopupComponent,
  ],
  exports: [
    CurrencySymbolComponent,
    NavbComponent,
    AddCategoryPopupComponent,
    AddTransactionPopupComponent,
    FabComponent
  ]
})
export class AppCommonModule {

}
