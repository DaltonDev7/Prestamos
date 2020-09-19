import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/core/interfaces/cliente';
import { Combox } from 'src/app/core/interfaces/combox';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ComboxService } from 'src/app/core/services/combox.service';
import { FormsBuilderService } from 'src/app/core/services/forms-builder.service';
import { PrestamoService } from 'src/app/core/services/prestamo.service';
import { ToastMessage } from 'src/app/core/services/toastmessages.service';

@Component({
  selector: 'app-registrar-prestamo',
  templateUrl: './registrar-prestamo.page.html',
  styleUrls: ['./registrar-prestamo.page.scss'],
})
export class RegistrarPrestamoPage implements OnInit {

  //ATRIBUTOS
  prestamoForm: FormGroup;
  cliente:Cliente;
  cedula;

  estadoCombox:Combox[];

  mensaje = 'este cedula no existe'
  permiso = false;

  constructor(
     public prestamoService : PrestamoService,
     public comboxService : ComboxService,
     public formBuilderServices : FormsBuilderService,
     private clienteService : ClienteService,
     public toastService : ToastMessage) { }

  ngOnInit() {
    this.prestamoForm = this.formBuilderServices.getPrestamoForm();

    this.estadoCombox = this.comboxService.EstadoCombox;

    this.prestamoForm.get('CedulaCliente').valueChanges.subscribe((data)=>{
      console.log(data.length)
      console.log(data)
      if(data.length == 11){
        this.clienteService.getClienteByCedula(data).then(()=>{
          this.getData()
        }).catch((err)=>{
          console.log("errro a subcribirme" + JSON.stringify(err))
          this.permiso = true
        })
      }
    })

 

  }



  async savePrestamo(){
    if(this.prestamoForm.invalid){
       await this.toastService.showClienteInvalid();
    }  else{
      this.prestamoForm.patchValue({'IdCliente': this.cliente.Id});
      console.log(this.prestamoForm.value)
      this.prestamoService.addPrestamo(this.prestamoForm.value).then((data)=>{
        this.prestamoForm.reset();
        this.toastService.showMessagePrestamoSaved();
      }).catch((err)=>{
        console.log("error al guardar prestamo" + JSON.stringify(err))
      })
    }
  }


  async getData(){
    this.clienteService.getClienteCedula().subscribe((cliente)=>{
      console.log("obteniedo datos " + JSON.stringify(cliente))
      if(cliente[0]){
        this.cliente = cliente[0];
        let nombreCompleto = this.cliente.Nombres + " " + this.cliente.Apellidos
        this.prestamoForm.patchValue({'NombresCliente' : nombreCompleto})
      }else{
        this.prestamoForm.get('NombresCliente').setValue(null);
         this.toastService.cedulaNotFound();
      }
    },(err) => console.log(JSON.stringify(err)))
  }

}
