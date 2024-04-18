import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../models/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  dispositivo: Dispositivo | any = null;

  constructor(private _router: ActivatedRoute, private _dispositivoService: DispositivoService) { }

  ngOnInit() {
    const idParam = this._router.snapshot.paramMap.get('id');
    const dispositivoId = idParam ? parseInt(idParam, 10) : -1;
    this._dispositivoService.getDispositivo(dispositivoId).pipe(
      take(1)
    ).subscribe(dispositivo => (this.dispositivo = dispositivo));
  }
}
