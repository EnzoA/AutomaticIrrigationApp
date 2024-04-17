import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../models/Dispositivo';
import { take } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dispositivos: Dispositivo[] = [];

  constructor(public dispositivoService: DispositivoService) { }

  ngOnInit(): void {
    this.dispositivoService.getDispositivos().pipe(
      take(1)
    ).subscribe(dispositivos => (this.dispositivos = dispositivos));
  }

}
