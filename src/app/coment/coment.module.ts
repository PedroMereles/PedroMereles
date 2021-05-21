import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComentPageRoutingModule } from './coment-routing.module';

import { ComentPage } from './coment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComentPageRoutingModule
  ],
  declarations: [ComentPage]
})
export class ComentPageModule {}
