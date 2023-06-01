import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdClienteP1Component } from './Components/View/id-cliente-p1/id-cliente-p1.component';
import { IdClienteInstalacaoComponent } from './Components/View/id-cliente-instalacao/id-cliente-instalacao.component';
import { FaturasComponent } from './Components/View/faturas/faturas.component';
import { PagamentoComponent } from './Components/View/pagamento/pagamento.component';
import { authGuard } from './Guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'idClienteP1', pathMatch: 'full' },
  { path: 'idClienteP1', component: IdClienteP1Component },
  { path: 'idClienteInstalacao', component: IdClienteInstalacaoComponent, canActivate: [authGuard] },
  { path: 'faturas', component: FaturasComponent, canActivate: [authGuard] },
  { path: 'pagamento', component: PagamentoComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'idClienteP1' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
