import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LogRiego } from '../models/LogRiego';

@Injectable({
  providedIn: 'root'
})
export class LogRiegoService {

  private _baseUrl = `${environment.apiBaseUrl}/logriegos`;

	constructor(private _http: HttpClient) { }

  getLogsRiegosDeElectrovalvula(electrovalvulaId: number): Observable<LogRiego[]> {
    return this._http.get<LogRiego[]>(`${this._baseUrl}?electrovalvulaId=${electrovalvulaId}`);
  }

	crearLogRiego(logRiego: LogRiego): Observable<any> {
    const fechaISO = logRiego.fecha.toISOString();
    const fecha = `${fechaISO.slice(0, 10)} ${fechaISO.slice(11, 19)}`;
		return this._http.post(this._baseUrl, ({ ...logRiego, fecha }));
	}
}
