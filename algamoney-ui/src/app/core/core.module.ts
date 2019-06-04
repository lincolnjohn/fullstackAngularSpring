import { RouterModule } from '@angular/router';
import { ErrorHandlerService } from './error-handler.service';
import { NavbarComponent } from './navbar/navbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { MessageService, ConfirmationService } from 'primeng/components/common/api';


@NgModule({
  declarations: [ NavbarComponent],
  exports: [
    NavbarComponent,
    ConfirmDialogModule,
    ToastModule,

  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule,
    RouterModule
  ],
  providers: [
    ErrorHandlerService,
    LancamentoService,
    MessageService,
    ConfirmationService,
  ]
})
export class CoreModule { }
