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

    return this.http.post<any>(this.authUrl, body.toString(), { headers });
  }
}
