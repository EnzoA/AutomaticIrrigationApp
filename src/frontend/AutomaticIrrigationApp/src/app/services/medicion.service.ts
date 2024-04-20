import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Medicion } from '../models/Medicion';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {

	constructor(private _http: HttpClient) { }

	crearMedicion(medicion: Medicion): Observable<any> {
    const fechaISO = medicion.fecha.toISOString();
    const fecha = `${fechaISO.slice(0, 10)} ${fechaISO.slice(11, 19)}`;
		return this._http.post(`${environment.apiBaseUrl}/mediciones`, ({ ...medicion, fecha }));
	}

  actualizarMedicion(dispositivoId: number, nuevoValor: number): Observable<any> {
    return this._http.post(`${environment.apiBaseUrl}/mediciones/actualizarUltimaMedicionDeDispositivo`, ({
      dispositivoId,
      valor: nuevoValor,
    }));
  }
}
