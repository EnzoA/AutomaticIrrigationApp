import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private _router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/authenticate')) {
      return next.handle(req);
    }
    const token = localStorage.getItem('token');
    let request = req;

    if (token) {
      request = this._saveToken(request, token);
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          }
          else {
            errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
          }
          console.log(errorMsg);
          return throwError(errorMsg);
        })
      );
    } else {
      this._router.navigate(['/login']);
      return next.handle(req);
    }
  }

  private _saveToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
}
