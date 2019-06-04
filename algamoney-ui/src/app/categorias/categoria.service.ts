import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriasUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  listarTodas(): Promise<any> {

    const headers = new HttpHeaders().set('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.get<any>(`${this.categoriasUrl}`,  {headers} )
    .toPromise()
    .then(response => response);
  }

}
