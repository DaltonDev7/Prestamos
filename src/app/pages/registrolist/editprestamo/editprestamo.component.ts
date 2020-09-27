import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Combox } from 'src/app/core/interfaces/combox';
import { Prestamo } from 'src/app/core/interfaces/prestamo';
import { AlertService } from 'src/app/core/services/alert.service';
import { ComboxService } from 'src/app/core/services/combox.service';
import { FormsBuilderService } from 'src/app/core/services/forms-builder.service';
import { PrestamoService } from 'src/app/core/services/prestamo.service';
import { ToastMessage } from 'src/app/core/services/toastmessages.service';

@Component({
  selector: 'app-editprestamo',
  templateUrl: './editprestamo.component.html',
  styleUrls: ['./editprestamo.component.scss'],
})
export class EditprestamoComponent implements OnInit {

  //atributos
  prestamoForm:FormGroup;
  clienteForm : FormGroup;
  prestamo: Prestamo;
  estadoCombox:Combox[]
  constructor(
    public prestamoService : PrestamoService,
    public formBuilderService: FormsBuilderService,
    public comboxService: ComboxService,
    public alertService : AlertService,
    public toasMessageService: ToastMessage,
    private router : Router
  ) { }

  ngOnInit() {
    this.prestamoForm = this.formBuilderService.getPrestamoForm();
    this.clienteForm = this.formBuilderService.getEditClientePrestamo();

    this.estadoCombox = this.comboxService.EstadoCombox;

    this.prestamoService.getPrestamoEdit().subscribe((prestamo)=>{
      if(prestamo[0]){
        this.clienteForm.patchValue(prestamo[0]);
        this.prestamoForm.patchValue(prestamo[0]);
        this.prestamo = prestamo[0];
      }
    })

    
  }


  async editPrestamo(){
    if(this.prestamoForm.invalid){
      await this.toasMessageService.showClienteInvalid();
    }else{
      this.prestamoService.updatePrestamo(this.prestamo.Id , this.prestamoForm.value).then(()=>{
        this.alertService.alertSuccess("Prestamo")
    
      }).catch((err)=>{
        console.log(JSON.stringify(err))
      })
    }
  }

  eliminarPrestamo(){
    this.prestamoService.deletePrestamoById(this.prestamo.Id).then(()=>{
      this.alertService.alertEliminar("Prestamo");
    }).catch((err)=>{
      console.log(JSON.stringify(err))
    })
  }

}
