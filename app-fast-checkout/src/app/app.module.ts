import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask, provideNgxMask } from 'ngx-mask';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './Components/nav/nav.component';
import { FooterComponent } from './Components/footer/footer.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CpfPipe } from './Pipes/cpf.pipe';
import { AddressPipe } from './Pipes/address.pipe';
import { CepPipe } from './Pipes/cep.pipe';
import { NamePipe } from './Pipes/name.pipe';
import { LoadingComponent } from './Components/loading/loading.component';
import { LoadingInterceptor } from './Interceptors/loading.interceptor';
import { StepComponent } from './Components/step/step.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    IdClienteP1Component,
    ButtonComponent,
    PaginatorComponent,
    IdClienteInstalacaoComponent,
    ImovelComponent,
    FaturasComponent,
    ValorFaturaComponent,
    PagamentoComponent,
    InputComponent,
    TypePayComponent,
    CpfPipe,
    AddressPipe,
    CepPipe,
    NamePipe,
    LoadingComponent,
    StepComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [ provideNgxMask(),
  {
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
