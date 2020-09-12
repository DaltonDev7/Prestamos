import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrarClientePageRoutingModule } from './registrar-cliente-routing.module';

import { RegistrarClientePage } from './registrar-cliente.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PhoneMaskDirective } from 'src/app/core/directives/phone-mask.directive';
import { CedulaMaskDirective } from 'src/app/core/directives/cedula-mask.directive';
import { CelularMaskDirective } from 'src/app/core/directives/celular-mask.directive';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RegistrarClientePageRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
 
  ],
  declarations: [
    RegistrarClientePage,
    CedulaMaskDirective,
    PhoneMaskDirective,
    CelularMaskDirective
  ]
})
export class RegistrarClientePageModule {}
