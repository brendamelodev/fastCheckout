import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { IdClienteP1Component } from './Components/View/id-cliente-p1/id-cliente-p1.component';
import { IdClienteInstalacaoComponent } from './Components/View/id-cliente-instalacao/id-cliente-instalacao.component';
import { FaturasComponent } from './Components/View/faturas/faturas.component';
import { PagamentoComponent } from './Components/View/pagamento/pagamento.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'idClienteP1', component: IdClienteP1Component },
  {path: 'idClienteInstalacao', component: IdClienteInstalacaoComponent },
  {path: 'faturas', component: FaturasComponent },
  {path: 'pagamento', component: PagamentoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
