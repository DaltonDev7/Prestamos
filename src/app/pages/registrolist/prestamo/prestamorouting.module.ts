import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PrestamoComponent } from './prestamo.component';
import { EditprestamoComponent } from '../editprestamo/editprestamo.component';
import { EditPrestamoResolver } from 'src/app/core/resolvers/edit-prestamo.resolver';
import { EditCuotaComponent } from '../edit-cuota/edit-cuota.component';
import { AddCuotaComponent } from '../add-cuota/add-cuota.component';

const routes: Routes = [
  {
    path:'',
    component: PrestamoComponent
  },
  {
    path:'edit/:id',
    component: EditprestamoComponent,
    resolve :{
      prestamo : EditPrestamoResolver
    }
  },
  {
    path:'addCuota/:id',
    component: AddCuotaComponent,
    resolve :{
      prestamo : EditPrestamoResolver
    }

  },
  {
    path:'editcuota/:id',
    component: EditCuotaComponent
  }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class PrestamoroutingModule { }
