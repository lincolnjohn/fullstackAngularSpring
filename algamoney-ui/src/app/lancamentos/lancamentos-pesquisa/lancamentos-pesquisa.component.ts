import { ErrorHandlerService } from './../../core/error-handler.service';
import { LancamentoService, LancamentoFiltro } from './../lancamento.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  filtro = new LancamentoFiltro();
  lancamentos = [];
  totalRegistros = 0;
  @ViewChild('tabela') grid;

  constructor(
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private confirmation: ConfirmationService
    ) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {

    this.filtro.pagina = pagina;


    this.lancamentoService.pesquisar(this.filtro)
      .then((resultado) => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
        this.excluir(lancamento);

      }
    });

  }
  excluir (lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
        .then(() => {
          this.pesquisar(this.filtro.pagina);
          this.messageService.add({severity: 'success', detail: 'Lançamento excluido com sucesso!'});

        })
        .catch(erro => this.errorHandler.handle(erro));
      }


}
