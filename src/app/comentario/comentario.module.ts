import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentarioPageRoutingModule } from './comentario-routing.module';
import { SubmenuComponent } from '../components/submenu/submenu.component';
import { ComentarioPage } from './comentario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentarioPageRoutingModule
  ],
  declarations: [ComentarioPage, SubmenuComponent]
})
export class ComentarioPageModule {}
