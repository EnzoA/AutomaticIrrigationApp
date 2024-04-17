import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, filter, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient, private _router: Router) { }

  public get isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  login(username: string, password: string): Observable<boolean> {
    return this._http.post<any>(`${environment.apiBaseUrl}/login`, { username, password }).pipe(
      filter(response => !!response),
      map(response => {
        localStorage.setItem('token', response.token);
        this._router.navigate(['home']);
        return true
      }),
      catchError((err) => of(false))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }
}
