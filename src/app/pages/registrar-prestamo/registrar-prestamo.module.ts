import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarPrestamoPageRoutingModule } from './registrar-prestamo-routing.module';

import { RegistrarPrestamoPage } from './registrar-prestamo.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarPrestamoPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarPrestamoPage]
})
export class RegistrarPrestamoPageModule {}
