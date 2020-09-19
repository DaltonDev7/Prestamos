import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PrestamoComponent } from './prestamo.component';
import { EditprestamoComponent } from '../editprestamo/editprestamo.component';

const routes: Routes = [
  {
    path:'',
    component: PrestamoComponent
  },
  {
    path:'edit/:id',
    component: EditprestamoComponent
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
