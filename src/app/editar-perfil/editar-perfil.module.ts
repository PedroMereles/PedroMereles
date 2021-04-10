import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilPageRoutingModule } from './editar-perfil-routing.module';
import { SubmenuComponent } from '../components/submenu/submenu.component';
import { EditarPerfilPage } from './editar-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilPageRoutingModule
  ],
  declarations: [EditarPerfilPage, SubmenuComponent]
})
export class EditarPerfilPageModule {}
