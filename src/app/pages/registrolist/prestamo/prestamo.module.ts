import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrestamoroutingModule } from './prestamorouting.module';
import { PrestamoComponent } from './prestamo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditprestamoComponent } from '../editprestamo/editprestamo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FiltroPipe } from 'src/app/core/pipes/cedula.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { EditCuotaComponent } from '../edit-cuota/edit-cuota.component';
import { AddCuotaComponent } from '../add-cuota/add-cuota.component';


@NgModule({
  declarations: [
    PrestamoComponent,
    EditprestamoComponent,
    EditCuotaComponent,
    AddCuotaComponent,
    FiltroPipe
  ],
  imports: [
    CommonModule,
    PrestamoroutingModule,
    SharedModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ]
})
export class PrestamoModule { }
