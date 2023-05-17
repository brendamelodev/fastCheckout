import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { IdClienteP1Component } from './Components/View/id-cliente-p1/id-cliente-p1.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'idClienteP1', component: IdClienteP1Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
