import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DashComponent } from "./dash.component";
import { CategoriesMetricsComponent } from "./categories-metrics/categories-metrics.component";
import { CategoryExpensesComponent } from "./categories-metrics/category-expenses/category-expenses.component";
import { MetricsCarouselComponent } from "./metrics-carousel/metrics-carousel.component";
import { AppCommonModule } from "../_common/Common.module";
import { FirstCarouselComponent } from "./metrics-carousel/first-carousel/first-carousel.component";
import { CardHostDirective } from "./metrics-carousel/_directives/CardHost";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AccountsBalanceCardComponent } from "./metrics-carousel/cards/accounts-balance-card/accounts-balance-card.component";
import { TransactionMetaReferenceCardComponent } from "./metrics-carousel/cards/transaction-meta-reference-card/transaction-meta-reference-card.component";
import { SecondCarouselComponent } from "./metrics-carousel/second-carousel/second-carousel.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,

    AppCommonModule
  ],
  exports: [
    DashComponent,
    CategoriesMetricsComponent,
    MetricsCarouselComponent,
    CategoryExpensesComponent,

    FirstCarouselComponent,

  ],
  declarations: [
    CardHostDirective,

    DashComponent,
    CategoriesMetricsComponent,
    CategoryExpensesComponent,
    MetricsCarouselComponent,

    FirstCarouselComponent,
    SecondCarouselComponent,
    AccountsBalanceCardComponent,
    TransactionMetaReferenceCardComponent,
  ]
})
export class DashboardModule {

}
