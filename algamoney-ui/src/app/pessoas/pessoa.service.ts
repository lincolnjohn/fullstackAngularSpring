import { Pessoa } from '../core/model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


export class PessoaFiltro {

  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}
@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';
  constructor(private http: HttpClient ) { }

  pesquisar(filtro: PessoaFiltro): Promise<any> {

    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    const params = new HttpParams({
      fromObject: {
        'page': filtro.pagina.toString(),
        'size': filtro.itensPorPagina.toString(),
        'nome': filtro.nome ? filtro.nome : []
        }
    });


    return this.http.get<any>(`${this.pessoasUrl}`,  {headers, params} )
      .toPromise()
      .then(response => {
        const pessoas = response.content;
        const resultado = {
          pessoas,
          total: response.totalElements
        };

        return resultado;

      });

  }

  excluir(codigo: number): Promise<void> {

    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, {headers})
    .toPromise()
    .then(() => null);

  }

  mudarStatus(codigo: number, ativo: boolean): Promise<void> {

    const headers = new HttpHeaders({
      'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
      'Content-Type': 'application/json'
    });
    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, {headers})
    .toPromise()
    .then(() => null);

  }

  listarTodas(): Promise<any> {

    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get<any>(`${this.pessoasUrl}`,  {headers} )
    .toPromise()
    .then(response => response.content);
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {
    // const headers = new HttpHeaders({
    //   'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==',
    //   'Content-Type': 'application/json'
    // });
    // const body = JSON.stringify(pessoa);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg=='
      })
    };
    // return this.http.post(`${this.pessoasUrl}/${body}`, {headers})
    // .toPromise()
    // .then(() => null);
    return this.http.post<Pessoa>(this.pessoasUrl, pessoa, httpOptions)
    .toPromise();
  }

}

