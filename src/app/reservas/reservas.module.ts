import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservasPageRoutingModule } from './reservas-routing.module';

import { ReservasPage } from './reservas.page';

import {NgCalendarModule} from 'ionic2-calendar'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservasPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [ReservasPage]
})
export class ReservasPageModule {}
