import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams } from 'url';

export interface LancamentoFiltro {
  descricao: string;
}


@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lacamentosUrl = 'http://localhost:8080/lancamentos';
  constructor(private http: HttpClient ) { }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {

    const params = filtro.descricao ? new HttpParams().set('descricao', filtro.descricao) : { }

    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get(`${this.lacamentosUrl}?resumo`,  {headers, params} )
      .toPromise();
      /*.then(response => {
        console.log(response);

      });*/
  }
}
