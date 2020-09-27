import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PrestamoComponent } from './prestamo.component';
import { EditprestamoComponent } from '../editprestamo/editprestamo.component';
import { EditPrestamoResolver } from 'src/app/core/resolvers/edit-prestamo.resolver';

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
