import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComentPage } from './coment.page';

const routes: Routes = [
  {
    path: '',
    component: ComentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComentPageRoutingModule {}
