import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrupoPageRoutingModule } from './grupo-routing.module';
import { SubmenuComponent } from '../components/submenu/submenu.component';

import { GrupoPage } from './grupo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrupoPageRoutingModule
  ],
  declarations: [GrupoPage, SubmenuComponent]
})
export class GrupoPageModule {}
