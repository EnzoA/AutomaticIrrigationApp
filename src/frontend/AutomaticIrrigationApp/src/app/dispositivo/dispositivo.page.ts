import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Dispositivo } from '../models/Dispositivo';
import { DispositivoService } from '../services/dispositivo.service';
import { take } from 'rxjs';
import * as Highcharts from 'highcharts';
import { Chart } from 'highcharts';
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

  constructor(private _router: ActivatedRoute, private _dispositivoService: DispositivoService) { }

  ngOnInit() {
    const idParam = this._router.snapshot.paramMap.get('id');
    const dispositivoId = idParam ? parseInt(idParam, 10) : -1;
    this._dispositivoService.getDispositivo(dispositivoId).pipe(
      take(1)
    ).subscribe(dispositivo => (this.dispositivo = dispositivo));
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
}
