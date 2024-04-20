import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DispositivoPageRoutingModule } from './dispositivo-routing.module';
import { DispositivoPage } from './dispositivo.page';
import { EstadoDirective } from '../directives/estado.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DispositivoPageRoutingModule,
  ],
  declarations: [DispositivoPage, EstadoDirective]
})
export class DispositivoPageModule {}
