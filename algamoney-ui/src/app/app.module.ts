import { PessoasPesquisaComponent } from './pessoas/pessoas-pesquisa/pessoas-pesquisa.component';
import { LancamentoCadastroComponent } from './lancamentos/lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos/lancamentos-pesquisa/lancamentos-pesquisa.component';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';


import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { HttpClientModule } from '@angular/common/http';

registerLocaleData(localePt);

const routes: Routes = [
  { path: 'lancamentos', component: LancamentosPesquisaComponent  },
  { path: 'lancamentos/novo', component: LancamentoCadastroComponent  },
  { path: 'lancamentos/:codigo', component: LancamentoCadastroComponent  },
  { path: 'pessoas', component: PessoasPesquisaComponent  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),

    CoreModule,
    LancamentosModule,
    PessoasModule
  ],
  providers: [
   {provide: LOCALE_ID, useValue: 'pt-BR'}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
