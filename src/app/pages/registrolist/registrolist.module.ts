import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrolistPageRoutingModule } from './registrolist-routing.module';

import { RegistrolistPage } from './registrolist.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrolistPageRoutingModule,
    SharedModule,
    FontAwesomeModule
    
  ],
  declarations: [
    RegistrolistPage,
  ]
})
export class RegistrolistPageModule {}
