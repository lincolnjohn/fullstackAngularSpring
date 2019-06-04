import { MessageService } from 'primeng/api';
import { LancamentoService } from './../lancamento.service';
import { Lancamento } from './../../core/model';
import { FormControl } from '@angular/forms';
import { PessoaService } from './../../pessoas/pessoa.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA'},
    { label: 'Despesa', value: 'DESPESA'},
  ];

  categorias = [
    // {label: 'Alimentação', value: 1},
    // {label: 'Vestuário', value: 2},
    // {label: 'Transporte', value: 3},
  ];

  pessoas = [
    // {label: 'Maria do Nascimento', value: 1},
    // {label: 'Ana Maria', value: 2},
    // {label: 'Pedro Alcântara', value: 3},
  ];
  lancamento = new Lancamento();
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private lancamentoService: LancamentoService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const codigoLancamento =  this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);

    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .then(lancamento => {
        this.lancamento = lancamento;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



  carregarCategorias() {
     this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias.map(c => ({ label: c.nome, value: c.codigo}));
      })
      .catch(erro  => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas.map(p => ({ label: p.nome, value: p.codigo}) );
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {

    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }

  }

  adicionarLancamento(form: FormControl) {
      this.lancamentoService.adicionar(this.lancamento)
      .then(lancamentoAdicionado => {
        this.messageService.add({severity: 'success', detail: 'Lançamento adicionado com sucesso!'});
        this.router.navigate(['/lancamentos', lancamentoAdicionado.codigo]);
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

    atualizarLancamento(form: FormControl) {
      this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento =>{
        this.lancamento = lancamento;
        this.messageService.add({severity: 'success', detail: 'Lançamento atualizado com sucesso!'})
      } )
      .catch(erro => this.errorHandler.handle(erro));

    }

    novo(form: FormControl) {
      form.reset();

      setTimeout(function () {
        this.lancamento = new Lancamento();
      }.bind(this), 1);
      this.router.navigate(['/lancamentos/novo']);
  }

}
