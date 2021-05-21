import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaServiciosPageRoutingModule } from './lista-servicios-routing.module';

import { ListaServiciosPage } from './lista-servicios.page';
import { SubmenuComponent } from '../components/submenu/submenu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaServiciosPageRoutingModule
  ],
  declarations: [ListaServiciosPage,SubmenuComponent]
})
export class ListaServiciosPageModule {}
