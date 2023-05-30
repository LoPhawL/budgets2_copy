import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashComponent } from './dash/dash.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: DashComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
