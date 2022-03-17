import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Catalogue } from './pages/catalogueComponent/catalogue.component';

const routes: Routes = [
  {
    path: 'catalogue',
    component: Catalogue,
  },
  { path: '', redirectTo :'catalogue', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
