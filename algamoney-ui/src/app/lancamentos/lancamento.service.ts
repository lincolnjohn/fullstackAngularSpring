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

    //const params = filtro.descricao ? new HttpParams().set('descricao', filtro.descricao) : { }

    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    const params = new HttpParams({
      fromObject: {
        'page': filtro.pagina.toString(),
        'size': filtro.itensPorPagina.toString(),
        'descricao': filtro.descricao ? filtro.descricao : [],
        'dataVencimentoDe': filtro.dataVencimentoInicio ? moment(filtro.dataVencimentoInicio).format('YYYY-MM-DD') : [],
        'dataVencimentoAte': filtro.dataVencimentoFim ? moment(filtro.dataVencimentoFim).format('YYYY-MM-DD') : []
        }
    });

    return this.http.get<any>(`${this.lacamentosUrl}?resumo`,  {headers, params} )
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
}
