import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogRiego } from '../models/LogRiego';

@Injectable({
  providedIn: 'root'
})
export class LogRiegoService {

	constructor(private _http: HttpClient) { }

	crearLogRiego(logRiego: LogRiego): Observable<any> {
    const fechaISO = logRiego.fecha.toISOString();
    const fecha = `${fechaISO.slice(0, 10)} ${fechaISO.slice(11, 19)}`;
		return this._http.post(`${environment.apiBaseUrl}/logriegos/`, ({ ...logRiego, fecha }));
	}
}
