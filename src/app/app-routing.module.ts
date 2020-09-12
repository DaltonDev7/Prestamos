import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path:'registrar-cliente',
    loadChildren:() => import('./pages/registrar-cliente/registrar-cliente.module').then(m => m.RegistrarClientePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'registrar-prestamo',
    loadChildren: () => import('./pages/registrar-prestamo/registrar-prestamo.module').then( m => m.RegistrarPrestamoPageModule)
  },
  {
    path: 'registrolist',
    loadChildren: () => import('./pages/registrolist/registrolist.module').then( m => m.RegistrolistPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
