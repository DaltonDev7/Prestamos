import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { EditclienteComponent } from './editcliente/editcliente.component';
import { EditprestamoComponent } from './editprestamo/editprestamo.component';
import { PrestamoComponent } from './prestamo/prestamo.component';

import { RegistrolistPage } from './registrolist.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrolistPage
  },
  {
    path: 'cliente',
    loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: 'prestamo',
    loadChildren: () => import('./prestamo/prestamo.module').then( m => m.PrestamoModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrolistPageRoutingModule { }
