import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { IdClienteP1Component } from './Components/View/id-cliente-p1/id-cliente-p1.component';
import { ButtonComponent } from './Components/button/button.component';
import { PaginatorComponent } from './Components/paginator/paginator.component';
import { IdClienteInstalacaoComponent } from './Components/View/id-cliente-instalacao/id-cliente-instalacao.component';
import { ImovelComponent } from './Components/imovel/imovel.component';
import { FaturasComponent } from './Components/View/faturas/faturas.component';
import { ValorFaturaComponent } from './Components/valor-fatura/valor-fatura.component';
import { PagamentoComponent } from './Components/View/pagamento/pagamento.component';
import { InputComponent } from './Components/input/input.component';
import { TypePayComponent } from './Components/type-pay/type-pay.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    IdClienteP1Component,
    ButtonComponent,
    PaginatorComponent,
    IdClienteInstalacaoComponent,
    ImovelComponent,
    FaturasComponent,
    ValorFaturaComponent,
    PagamentoComponent,
    InputComponent,
    TypePayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
