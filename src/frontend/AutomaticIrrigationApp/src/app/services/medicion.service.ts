import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicion } from '../models/Medicion';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

  private _baseUrl = `${environment.apiBaseUrl}/mediciones`;

	constructor(private _http: HttpClient) { }

  getMedicionesDeDispositivo(dispositivoId: number): Observable<Medicion[]> {
    return this._http.get<Medicion[]>(`${this._baseUrl}?dispositivoId=${dispositivoId}`);
  }

	crearMedicion(medicion: Medicion): Observable<any> {
    const fechaISO = medicion.fecha.toISOString();
    const fecha = `${fechaISO.slice(0, 10)} ${fechaISO.slice(11, 19)}`;
		return this._http.post(this._baseUrl, ({ ...medicion, fecha }));
	}

  actualizarMedicion(dispositivoId: number, nuevoValor: number): Observable<any> {
    return this._http.post(`${this._baseUrl}/actualizarUltimaMedicionDeDispositivo`, ({
      dispositivoId,
      valor: nuevoValor,
    }));
  }
}
