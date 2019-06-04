import { Injectable } from '@angular/core';
import {MessageService} from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {

    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;

    } else if (errorResponse instanceof HttpErrorResponse
      && errorResponse.status >= 400 && errorResponse.status <= 499) {

      let errors;
      msg = 'Ocorreu um erro ao processar a sua solicitação';

      try {
        errors = errorResponse.error;
        msg = errors[0].mensagemUsuario;
        console.error('Ocorreu um erro teste3', msg);

      } catch (e) { }

      console.error('Ocorreu um erro teste1', errorResponse);

    } else {
      msg = 'Erro ao processar serviço remoto. Tente novamente.';
      console.error('Ocorreu um erro teste2', errorResponse);
    }
    this.messageService.add({severity: 'error', detail: msg});

  }
}
