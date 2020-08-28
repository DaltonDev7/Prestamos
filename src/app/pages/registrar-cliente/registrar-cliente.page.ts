import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsBuilderService } from 'src/app/core/services/forms-builder.service';

import { BasedatosService } from 'src/app/core/services/basedatos.service';


@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.page.html',
  styleUrls: ['./registrar-cliente.page.scss'],
})
export class RegistrarClientePage implements OnInit {

  //ATRIBUTOS
  clienteForm:FormGroup;
  listCliente;

  permiso1 = false;
  permiso2 = false;

  constructor(
   private formsBuilderService : FormsBuilderService,
   public baseDatosService : BasedatosService
  ) { }

  ngOnInit() {
     this.clienteForm = this.formsBuilderService.getClienteBuilder();

    this.baseDatosService.getDataBaseState().subscribe((data)=>{
      console.log("respuesta de la db")
      console.log(JSON.stringify(data))
      if(data){
        this.permiso1 = true
        this.baseDatosService.getClientes().subscribe((data)=>{
          console.log(data)
          this.listCliente = data
        })
      }
    })

  }

  saveCliente(){
    console.log(this.clienteForm.value)
    this.baseDatosService.addCliente(
      this.clienteForm.value
    ).then((data)=>{
      console.log('guardado')
      this.permiso2 = true
      this.clienteForm.reset();
    })
   // this.clienteService.saveCliente(this.clienteForm.value);
 
  }

}
