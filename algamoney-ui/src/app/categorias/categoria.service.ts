import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  // categoriasUrl = 'http://localhost:8080/categorias';
  categoriasUrl: string;

  constructor(private http: HttpClient) {
    this.categoriasUrl = `${environment.apiUrl}/categorias`;
   }

  listarTodas(): Promise<any> {


    return this.http.get<any>(`${this.categoriasUrl}`)
      .toPromise()
      .then(response => response);
  }

}
