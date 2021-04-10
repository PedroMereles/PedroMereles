import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservarPageRoutingModule } from './reservar-routing.module';
import { SubmenuComponent } from '../components/submenu/submenu.component';
import { ReservarPage } from './reservar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservarPageRoutingModule
  ],
  declarations: [ReservarPage, SubmenuComponent]
})
export class ReservarPageModule {}
