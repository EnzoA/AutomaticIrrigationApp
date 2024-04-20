import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../models/Medicion';
import { Observable, take, tap } from 'rxjs';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {

    dispositivoId?: number;
    mediciones$?: Observable<Medicion[]>;

    constructor(
        private _router: ActivatedRoute,
        private _medicionService: MedicionService) { }

    ngOnInit() {
        const idParam = this._router.snapshot.paramMap.get('dispositivoId');
        this.dispositivoId = idParam ? parseInt(idParam, 10) : -1;
        this.mediciones$ = this._medicionService.getMedicionesDeDispositivo(this.dispositivoId);
    }
}
