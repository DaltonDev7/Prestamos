import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule, Router } from '@angular/router';
import { ClienteComponent } from './cliente.component';
import { EditclienteComponent } from '../editcliente/editcliente.component';
import { EditClienteResolver } from 'src/app/core/resolvers/edit-cliente.resolver';


const routes : Routes = [
  {
    path:'',
    component: ClienteComponent
  },
  {
    path:'edit/:id',
    component: EditclienteComponent,
    resolve :{ 
      cliente: EditClienteResolver
    }
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class ClienteroutingModule { }
