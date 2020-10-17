import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormsBuilderService } from 'src/app/core/services/forms-builder.service';

import { BasedatosService } from 'src/app/core/services/basedatos.service';
import { Combox } from 'src/app/core/interfaces/combox';
import { ComboxService } from 'src/app/core/services/combox.service';
import { ToastController } from '@ionic/angular';
import { ToastMessage } from 'src/app/core/services/toastmessages.service';
import { Cliente } from 'src/app/core/interfaces/cliente';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ValidatorFormsService } from 'src/app/core/services/validator-forms.service';
import { pipe } from 'rxjs';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.page.html',
  styleUrls: ['./registrar-cliente.page.scss'],
})
export class RegistrarClientePage implements OnInit, OnDestroy {

  //ATRIBUTOS
  clienteForm: FormGroup;
  cedulaId;
  //COMBOX
  sexoCombox: Combox[];
  bancoCombox: Combox[];
  estadoCombox: Combox[];
  cliente:Cliente;
  permiso1 = false;
  permiso2 = false;

   fecha;

  constructor(
    private formsBuilderService: FormsBuilderService,
    public baseDatosService: BasedatosService,
    private clienteService: ClienteService,
    public comboxServices: ComboxService,
    public toastController: ToastController,
    public toasMessageService: ToastMessage,
    public clienteServices : ClienteService,
    public validatorServices : ValidatorFormsService
  ) { }


  ngOnInit() {
    this.clienteForm = this.formsBuilderService.getClienteBuilder();
    this.sexoCombox = this.comboxServices.sexoCombox;
    this.bancoCombox = this.comboxServices.bancosCombox;
    this.estadoCombox = this.comboxServices.EstadoCombox;

    this.clienteForm.get('Cedula').valueChanges.subscribe((data)=>{
      console.log(JSON.stringify(data))
      if(data.length == 11){
        console.log(JSON.stringify(data))
        this.clienteServices.getClienteByCedula(data).then(()=>{
          this.validateCliente();
        })
      }
    })



  

  }


  async saveCliente() {

    if (this.clienteForm.invalid) {
      await this.toasMessageService.showClienteInvalid();
    } else {
      
      this.baseDatosService.addCliente(
        this.clienteForm.value
      ).then((data) => {
        this.permiso2 = true
        this.clienteForm.reset();
        this.toasMessageService.showMessageClienteSaved();
      }).catch((err)=>{
        console.log(JSON.stringify(err))
      })
    }
  }

  async showMessageSuccess() {
    const toast = await this.toastController.create({
      message: 'Cliente Registrado',
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  ngOnDestroy(): void {
   //this.validateCliente().unsubscribe();
  }

  

  validateCliente(){
   this.clienteServices.getClienteCedula().subscribe((cliente)=>{
      console.log("obteniedo datos " + JSON.stringify(cliente))
      if(cliente[0]){
        this.toasMessageService.cedulaExist();
        //this.clienteForm.get('Cedula').setValue(null)
        //this.clienteForm.get('Cedula').updateValueAndValidity();
        //this.validatorServices.disabledAllControls(this.clienteForm , ['Cedula'])
      }else{
       // this.validatorServices.enableAllControls(this.clienteForm );
      }
    })
  }



}
