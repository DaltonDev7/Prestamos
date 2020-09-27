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
  clienteForm : FormGroup;
  cliente:Cliente;
  cedula;

  estadoCombox:Combox[];
  tipoPrestamo:Combox[];
  tiempoPagarCombox:any[];

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
    this.clienteForm = this.formBuilderServices.getAddClientePrestamoBuilder();

    this.estadoCombox = this.comboxService.EstadoCombox;
    this.tipoPrestamo = this.comboxService.tipoPrestamo;
    this.tiempoPagarCombox = this.comboxService.tiempoPagar;

    this.clienteForm.get('Cedula').valueChanges.subscribe((data)=>{
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

    this.prestamoService.setDisabled(this.prestamoForm);

    this.prestamoService.setValidateCampos(this.prestamoForm)
      this.prestamoService.calcularCuota(this.prestamoForm)

 

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
        this.clienteForm.patchValue(this.cliente);
      }else{
         this.clienteForm.get('Nombres').setValue(null);
         this.clienteForm.get('Apellidos').setValue(null);
         this.clienteForm.get('Direccion').setValue(null);
         this.clienteForm.get('Sexo').setValue(null);
         this.clienteForm.get('Celular').setValue(null);
         this.toastService.cedulaNotFound();
      }
    },(err) => console.log(JSON.stringify(err)))
  }

}
