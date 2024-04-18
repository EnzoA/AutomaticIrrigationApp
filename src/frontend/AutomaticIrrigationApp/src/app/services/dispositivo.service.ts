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
		return this._http.get<Dispositivo[]>(`${environment.apiBaseUrl}/dispositivos`);
	}

	getDispositivo(id: number): Observable<Dispositivo> {
		return this._http.get<Dispositivo>(`${environment.apiBaseUrl}/dispositivos/${id}`);
	}
}
