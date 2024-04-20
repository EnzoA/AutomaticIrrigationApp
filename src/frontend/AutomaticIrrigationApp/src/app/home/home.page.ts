import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../models/Dispositivo';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  dispositivos$?: Observable<Dispositivo[]>;

  constructor(
    private _dispositivoService: DispositivoService,
    private _loginService: LoginService) { }

  ngOnInit(): void {
    this.dispositivos$ = this._dispositivoService.getDispositivos();
  }

  logout() {
    this._loginService.logout();
  }
}
