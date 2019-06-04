import { Pessoa } from './../../core/model';
import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();
  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  salvar(form: FormControl) {
    return  this.pessoaService.adicionar(this.pessoa)
      .then(() => {
        this.messageService.add({severity: 'success', detail: 'Pessoa adicionado com sucesso!'});
        form.reset();
        this.pessoa = new Pessoa();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }


}
