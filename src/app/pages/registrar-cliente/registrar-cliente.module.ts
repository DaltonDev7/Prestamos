import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarClientePageRoutingModule } from './registrar-cliente-routing.module';

import { RegistrarClientePage } from './registrar-cliente.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegistrarClientePageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [RegistrarClientePage]
})
export class RegistrarClientePageModule {}
