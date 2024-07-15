import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  private authUrl = 'http://localhost:8090/api/security/oauth/token';
  private clientId = 'frontedapp';
  private clientSecret = '12345';

  constructor(private http: HttpClient) { }

  getToken(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    });
  
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);
  
    console.log('Sending token request with body:', body.toString());
  
    return this.http.post<any>(this.authUrl, body.toString(), { headers });
  }
  

  loginUser(token: any) {
    localStorage.setItem('access_token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getToken1(): string | null {
    return localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  getUserRole(): string | null {
    const token = this.getToken1();
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.authorities ? decodedToken.authorities[0] : null;
    }
    return null;
  }
}
