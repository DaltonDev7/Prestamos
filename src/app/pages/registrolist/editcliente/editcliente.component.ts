import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/core/interfaces/cliente';
import { Combox } from 'src/app/core/interfaces/combox';
import { BasedatosService } from 'src/app/core/services/basedatos.service';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ComboxService } from 'src/app/core/services/combox.service';
import { FormsBuilderService } from 'src/app/core/services/forms-builder.service';
import { ToastMessage } from 'src/app/core/services/toastmessages.service';


@Component({
  selector: 'app-editcliente',
  templateUrl: './editcliente.component.html',
  styleUrls: ['./editcliente.component.scss'],
})
export class EditclienteComponent implements OnInit {

  //atributos
  clienteForm:FormGroup;
  cliente: Cliente;
  //COMBOX
  sexoCombox: Combox[];
  bancoCombox: Combox[];
  estadoCombox: Combox[];

  constructor(
    public formsBuilderService : FormsBuilderService,
    public comboxService : ComboxService,
    public clienteService : ClienteService,
    private activeRoute: ActivatedRoute,
    public baseDatosService : BasedatosService,
    public toasMessageService: ToastMessage,
    private router : Router
  ) { }

  ngOnInit() {
    this.clienteForm = this.formsBuilderService.getClienteBuilder();

    this.sexoCombox = this.comboxService.sexoCombox;
    this.bancoCombox = this.comboxService.bancosCombox;
    this.estadoCombox = this.comboxService.EstadoCombox;
    
    this.clienteService.getCliente().subscribe((cliente)=>{
      console.log(JSON.stringify(cliente))
      if(cliente[0]){
        this.cliente = cliente[0];
        this.clienteForm.patchValue(cliente[0])
      }
    },
    (erro) => console.log("error en el edit cliente " + JSON.stringify(erro))
    )
    
  }


  async editCliente(){
    if (this.clienteForm.invalid) {
      await this.toasMessageService.showClienteInvalid();
    }else{
      this.baseDatosService.updateCliente(this.cliente.Id , this.clienteForm.value).then((data)=>{
        this.toasMessageService.showMessageClienteUpdate()

        // let currentRoute = this.router.url.split('/');

        // if(currentRoute.includes('edit')){
        //   currentRoute.splice(currentRoute.indexOf('edit'), currentRoute.length);
        // }else{
        //   currentRoute.pop();
        // }
        // this.router.createUrlTree([currentRoute.join('/')]);

      }).catch((err)=>{
        console.log(JSON.stringify(err))
      })
    }
  }

  eliminarCliente(){
    this.baseDatosService.deleteCliente(this.cliente.Id).then((data)=>{
       this.toasMessageService.showMessageClienteDelete();
      //  let currentRoute = this.router.url.split('/');
      //  currentRoute.pop();
      //  this.router.navigate([currentRoute.join('/')]);
    }).catch((err)=>{
        console.log(JSON.stringify(err))
      })
  }

  

}
