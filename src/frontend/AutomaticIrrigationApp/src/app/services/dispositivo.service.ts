import { Injectable } from '@angular/core';
import { Dispositivo } from '../models/Dispositivo';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

   getDispositivos(): Observable<Dispositivo[]> {
      return this._http.get(`${environment.apiBaseUrl}/dispositivos`).pipe(
        map(response => (response as Dispositivo[]))
      );
   }
}
