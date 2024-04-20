import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogRiegoService } from '../services/logRiego.service';
import { Observable } from 'rxjs';
import { LogRiego } from '../models/LogRiego';

@Component({
  selector: 'app-riegos',
  templateUrl: './riegos.page.html',
  styleUrls: ['./riegos.page.scss'],
})
export class RiegosPage implements OnInit {

  dispositivoId?: number;
  riegos$?: Observable<LogRiego[]>;

  constructor(
    private _router: ActivatedRoute,
    private _logRiegoService: LogRiegoService
  ) { }

  ngOnInit() {
    const dispositivoIdParam = this._router.snapshot.paramMap.get('dispositivoId');
    this.dispositivoId = dispositivoIdParam ? parseInt(dispositivoIdParam, 10) : -1;
    const electrovalvulaIdParam = this._router.snapshot.paramMap.get('electrovalvulaId');
    const electrovalvulaId = electrovalvulaIdParam ? parseInt(electrovalvulaIdParam, 10) : -1;
    this.riegos$ = this._logRiegoService.getLogsRiegosDeElectrovalvula(electrovalvulaId);
  }

}
