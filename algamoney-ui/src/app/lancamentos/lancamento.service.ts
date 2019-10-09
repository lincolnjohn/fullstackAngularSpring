import { Lancamento } from './../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as moment from 'moment';


export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 5;
}


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lacamentosUrl = 'http://localhost:8080/lancamentos';
  constructor(private http: HttpClient ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    // const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    const params = new HttpParams({
      fromObject: {
        'page': filtro.pagina.toString(),
        'size': filtro.itensPorPagina.toString(),
        'descricao': filtro.descricao ? filtro.descricao : [],
        'dataVencimentoDe': filtro.dataVencimentoInicio ? moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD') : [],
        'dataVencimentoAte': filtro.dataVencimentoFim ? moment(filtro.dataVencimentoFim).format('YYYY-MM-DD') : []
        }
    });

    return this.http.get<any>(`${this.lacamentosUrl}?resumo`,  {params} )
      .toPromise()
      .then(response => {
        const lancamentos = response.content;
        const resultado = {
          lancamentos,
          total: response.totalElements
        };

        return resultado;

      });
  }

  excluir(codigo: number): Promise<void> {

    // const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lacamentosUrl}/${codigo}`)
    .toPromise()
    .then(() => null);

  }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {
    // const headers = new HttpHeaders({
    //   'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
    //   'Content-Type': 'application/json'
    // });
    // const body = JSON.stringify(lancamento);

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //     // 'Authorization': 'Basic YWRtaW5AYWxnYW1vsbmV5LmNvbTphZG1pbg=='
    //   })
    // };

    // return this.http.post(`${this.lacamentosUrl}/${body}`, {headers})
    // .toPromise()
    // .then(() => null);
    return this.http.post<Lancamento>(this.lacamentosUrl, lancamento)
    .toPromise();

  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //     //'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
    //   })
    // };
    return this.http.put<Lancamento>(`${this.lacamentosUrl}/${lancamento.codigo}`, lancamento)
    .toPromise()
    .then(response => {
      const lancamentoAlterado = response as Lancamento;
      this.converterStringsParaDatas([lancamentoAlterado]);
      return lancamentoAlterado;
    });

  }

  buscarPorCodigo(codigo: number): Promise<Lancamento> {
    //const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lacamentosUrl}/${codigo}`)
    .toPromise()
    .then(response => {
      const lancamento = response as Lancamento;
      this.converterStringsParaDatas([lancamento]);
      return lancamento;
    });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento, 'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento, 'YYYY-MM-DD').toDate();
      }
    }
  }
}
