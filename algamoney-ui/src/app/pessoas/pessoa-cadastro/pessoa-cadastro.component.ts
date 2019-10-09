import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const codigoPessoa =  this.route.snapshot.params['codigo'];

    this.title.setTitle('Nova pessoa');

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);

    }
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
    .then(pessoa => {
      this.pessoa = pessoa;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handle(erro));

  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }


  atualizarTituloEdicao() {
    this.title.setTitle(`Edição: ${this.pessoa.nome}`);
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

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
    .then(pessoaAdicionado => {
      this.messageService.add({severity: 'success', detail: 'Pessoa adicionado com sucesso!'});
      this.router.navigate(['/pessoas', pessoaAdicionado.codigo]);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
    .then(pessoa =>{
      this.pessoa = pessoa;
      this.messageService.add({severity: 'success', detail: 'Pessoa atualizada com sucesso!'})
      this.atualizarTituloEdicao();
    } )
    .catch(erro => this.errorHandler.handle(erro));

  }

  novo(form: FormControl) {
    form.reset();
    this.router.navigate(['/pessoas/novo']);
}

}
