import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path:'registrar-cliente',
    loadChildren:() => import('./pages/registrar-cliente/registrar-cliente.module').then(m => m.RegistrarClientePageModule)
  },
  {
    path: 'registrar-prestamo',
    loadChildren: () => import('./pages/registrar-prestamo/registrar-prestamo.module').then( m => m.RegistrarPrestamoPageModule)
  },
  {
    path: 'registrolist',
    loadChildren: () => import('./pages/registrolist/registrolist.module').then( m => m.RegistrolistPageModule)
  },
  // {
  //   path:'cliente-list',
  //   loadChildren: () => import('./pages/registrolist/cliente/cliente.module').then( m => m.ClienteModule)
  // },
  // {
  //   path:'prestamo-list',
  //   loadChildren: () => import('./pages/registrolist/prestamo/prestamo.module').then( m => m.PrestamoModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
