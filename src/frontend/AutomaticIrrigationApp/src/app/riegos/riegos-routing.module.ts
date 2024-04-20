import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiegosPage } from './riegos.page';

const routes: Routes = [
  {
    path: '',
    component: RiegosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiegosPageRoutingModule {}
