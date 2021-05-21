import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaServiciosPage } from './lista-servicios.page';

const routes: Routes = [
  {
    path: '',
    component: ListaServiciosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaServiciosPageRoutingModule {}
