import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarServicioPage } from './agregar-servicio.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarServicioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarServicioPageRoutingModule {}
