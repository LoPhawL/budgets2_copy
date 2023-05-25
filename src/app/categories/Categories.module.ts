import { NgModule } from "@angular/core";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { CategoriesComponent } from "./categories.component";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppCommonModule } from "../_common/Common.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    FontAwesomeModule,

    AppCommonModule
  ],
  exports: [
    CategoriesComponent,
    CategoriesListComponent,
  ],
  declarations: [
    CategoriesComponent,
    CategoriesListComponent,
  ]
})
export class CategoriesModule {

}
