import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoroutingModule } from './prestamorouting.module';
import { PrestamoComponent } from './prestamo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditprestamoComponent } from '../editprestamo/editprestamo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltroPipe } from 'src/app/core/pipes/cedula.pipe';



@NgModule({
  declarations: [
    PrestamoComponent,
    EditprestamoComponent,
    FiltroPipe
  ],
  imports: [
    CommonModule,
    PrestamoroutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PrestamoModule { }
