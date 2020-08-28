import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrarPrestamoPage } from './registrar-prestamo.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrarPrestamoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrarPrestamoPageRoutingModule {}
