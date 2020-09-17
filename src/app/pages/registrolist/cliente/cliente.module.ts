import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteComponent } from './cliente.component';
import { ClienteroutingModule } from './clienterouting.module';
import { FiltroPipe } from 'src/app/core/pipes/cedula.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditclienteComponent } from '../editcliente/editcliente.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClienteComponent,
    EditclienteComponent,
    FiltroPipe
  ],
  imports: [
    CommonModule,
    ClienteroutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ClienteModule { }
