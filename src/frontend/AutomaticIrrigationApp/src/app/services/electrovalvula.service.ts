import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElectrovalvulaService {

	constructor(private _http: HttpClient) { }

	cambiarEstadoElectrovalvula(electrovlvulaId: number, abierta: boolean): Observable<boolean> {
		return this._http.patch(`${environment.apiBaseUrl}/electrovalvulas/${electrovlvulaId}`, { abierta }).pipe(
      map(_ => abierta)
    );
	}
}
