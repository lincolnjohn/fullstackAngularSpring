import { Component, OnInit } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})

export class PessoasPesquisaComponent implements OnInit {

  filtro = new PessoaFiltro();
  pessoas = [];
  totalRegistros = 0;

  constructor(
    private pessoaService: PessoaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
    ) { }


  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;


    this.pessoaService.pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
      });
  }

  confirmarExclusao(pessoa: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(pessoa);

      }
    });

  }
  excluir (pessoa: any) {
    this.pessoaService.excluir(pessoa.codigo)
        .then(() => {
          this.pesquisar(this.filtro.pagina);
          this.messageService.add({severity: 'success', detail: 'Pessoa excluida com sucesso!'});

        })
        .catch(erro => this.errorHandler.handle(erro));
  }

  mudarStatus (pessoa: any): void {

    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.codigo, novoStatus)
        .then(() => {
          const acao = novoStatus ? 'ativada' : 'desativada';
          pessoa.ativo = novoStatus;

          this.messageService.add({severity: 'success', detail: `Pesso ${acao} com sucesso!`});

        })
        .catch(erro => this.errorHandler.handle(erro));
  }


  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  listarTodas() {

  }

}
