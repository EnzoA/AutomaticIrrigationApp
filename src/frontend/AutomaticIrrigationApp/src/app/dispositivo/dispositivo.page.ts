import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../models/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import { forkJoin, take, tap } from 'rxjs';
import * as Highcharts from 'highcharts';
import { Chart } from 'highcharts';
import { ElectrovalvulaService } from '../services/electrovalvula.service';
import { LogRiegoService } from '../services/logRiego.service';
import { LogRiego } from '../models/LogRiego';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../models/Medicion';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  private _chartOptions?: any;
  private _myChart?: Chart;
  dispositivo?: Dispositivo;

  constructor(
    private _router: ActivatedRoute,
    private _dispositivoService: DispositivoService,
    private _electrovalvulaService: ElectrovalvulaService,
    private _logRiegoService: LogRiegoService,
    private _medicionService: MedicionService) { }

  ngOnInit() {
    const idParam = this._router.snapshot.paramMap.get('dispositivoId');
    const dispositivoId = idParam ? parseInt(idParam, 10) : -1;
    this._dispositivoService.getDispositivo(dispositivoId).pipe(
      take(1)
    ).subscribe(dispositivo => (this.dispositivo = dispositivo));
  }

  abrirElectrovalvula() {
    this._cambiarEstadoElectrovalvula(true);
  }

  cerrarElectrovalvula() {
    this._cambiarEstadoElectrovalvula(false);
  }

  ionViewDidEnter() {
    this._generarChart();
  }

  ionViewDidLeave() {
    if (this._myChart) {
        this._myChart.destroy();
        this._myChart = undefined;
    }
  }

  private _cambiarEstadoElectrovalvula(abierta: boolean) {
    // TODO: Este approach carece de atomicidad y de consistencia.
    // Se debería reemplazar por un custom endpoint que haga todos los inserts/updates en una transacción.
    if (this.dispositivo) {
      forkJoin([
        this._electrovalvulaService.cambiarEstadoElectrovalvula(this.dispositivo.electrovalvulaId, abierta),
        this._logRiegoService.crearLogRiego(<LogRiego>{
          abierta: abierta,
          fecha: new Date(),
          electrovalvulaId: this.dispositivo!.electrovalvulaId,
        }),
        // De acuerdo con lo solicidado en la consigna, sólo se hace el insert de una nueva medición
        // cuando la electroválvula es cerrada.
        abierta
        ? this._medicionService.actualizarMedicion(
          this.dispositivo!.dispositivoId,
          this._getMedicionActualizada(this.dispositivo!.ultimaMedicion!, abierta))
        : this._medicionService.crearMedicion(<Medicion>{
          dispositivoId: this.dispositivo!.dispositivoId,
          fecha: new Date(),
          valor: this._getMedicionActualizada(this.dispositivo!.ultimaMedicion!, abierta),
        })
      ]).pipe(
        take(1),
        tap(([abierta, _]) => {
          this.dispositivo!.electrovalvulaAbierta = abierta;
          this.dispositivo!.ultimaMedicion = this._getMedicionActualizada(this.dispositivo!.ultimaMedicion!, abierta);
          this._chartOptions = {
            ...this._chartOptions,
            series: [{
              ...this._chartOptions[0],
              data: [this.dispositivo?.ultimaMedicion],
            }]
          };
          this._myChart!.update(this._chartOptions);
        })
      ).subscribe();
    }
  }

  private _generarChart() {
    this._chartOptions = {
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        },
        title: { text: this.dispositivo?.nombre || '-' },
        credits: { enabled: false },
        pane: {
            startAngle: -150,
            endAngle: 150
        },
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: { step: 2, rotation: 'auto' },
            title: { text: 'kPA' },
            plotBands: [
                {
                    from: 0,
                    to: 10,
                    color: '#55BF3B' // green
                },
                {
                    from: 10,
                    to: 30,
                    color: '#DDDF0D' // yellow
                },
                {
                    from: 30,
                    to: 100,
                    color: '#DF5353' // red
                }
            ]
        },
        series: [
            {
                name: 'kPA',
                data: [this.dispositivo?.ultimaMedicion || 0],
                tooltip: { valueSuffix: ' kPA' }
            }
        ]
    };

    this._myChart = Highcharts.chart('highcharts', this._chartOptions);
  }

  // Simula un cambio en la medición asociada a la electroválvula en función de si ésta fue abierta o cerrada.
  private _getMedicionActualizada(ultimaMedicion: number, valvulaAbierta: boolean): number {
    return valvulaAbierta
    ? (ultimaMedicion ? Math.max(ultimaMedicion - 5, 0) : 0)
    : (ultimaMedicion ? Math.min(ultimaMedicion + 5, 100) : 5);
  }
}
