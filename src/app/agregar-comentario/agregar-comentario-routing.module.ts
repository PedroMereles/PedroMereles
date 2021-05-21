import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarComentarioPage } from './agregar-comentario.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarComentarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarComentarioPageRoutingModule {}
