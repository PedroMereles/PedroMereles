import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarServicioPageRoutingModule } from './agregar-servicio-routing.module';

import { AgregarServicioPage } from './agregar-servicio.page';
import { SubmenuComponent } from '../components/submenu/submenu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarServicioPageRoutingModule
  ],
  declarations: [AgregarServicioPage, SubmenuComponent]
})
export class AgregarServicioPageModule {}
