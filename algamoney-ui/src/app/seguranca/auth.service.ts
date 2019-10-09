import { text } from '@angular/core/src/render3';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl = 'http://localhost:8080/oauth/token';
  tokenRevoke = 'http://localhost:8080/tokens/revoke';
  jwtPayload: any;

  constructor( private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.carregarToken();
  }

  login(usuario: string, senha: string): Promise<void> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
      }),
      withCredentials: true,
    };
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEByMA==');
    // // headers.append('Username', 'angular');
    // headers.append('Password', '@ngul@r0');
    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post<{access_token: string}>(this.oauthTokenUrl, body, httpOptions)
      .toPromise()
      .then(response => {
        // console.log(response);
        this.armazenarToken(response.access_token ) ;

      })
      .catch(response => {
        // console.log(response);
        const responseError = response.error;
        if (response.status === 400) {

          if (responseError.error === 'invalid_grant') {
            return Promise.reject('Usuário ou senha inválida!');
          }

        }
        return Promise.reject(response);

      });
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  obterNovoAccessToken(): Promise<void> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
      }),
      withCredentials: true,

    };

    const body = 'grant_type=refresh_token';

    return this.http.post<{access_token: string}>(this.oauthTokenUrl, body, httpOptions, )
      .toPromise()
      .then(response => {
        this.armazenarToken(response.access_token ) ;
        console.log('Novo access token criado!');

        return Promise.resolve(null);

      })
      .catch(response => {
          console.log('Erro ao renovar token. ', response);
          return Promise.resolve(null);

      });
   }

   limparAccessToken() {
     localStorage.removeItem('token');
     this.jwtPayload = null;
   }

   logout() {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
      }),
      withCredentials: true,
    };

    return this.http.delete<{access_token: string}>(this.tokenRevoke, httpOptions)
     .toPromise()
     .then(() => {
        this.limparAccessToken();
     });
   }

   isAccessTokenInvalido() {
     const token = localStorage.getItem('token');

     return !token || this.jwtHelper.isTokenExpired(token);
   }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);

  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
    return false;

  }
}
