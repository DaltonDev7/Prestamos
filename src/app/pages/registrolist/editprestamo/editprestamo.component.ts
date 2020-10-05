import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Combox } from 'src/app/core/interfaces/combox';
import { Cuota } from 'src/app/core/interfaces/cuota';
import { Prestamo } from 'src/app/core/interfaces/prestamo';
import { AlertService } from 'src/app/core/services/alert.service';
import { ComboxService } from 'src/app/core/services/combox.service';
import { CuotaService } from 'src/app/core/services/cuota.service';
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
  prestamoForm: FormGroup;
  clienteForm: FormGroup;
  prestamo: Prestamo;
  cuotaList:Cuota[] = [];

  //combox
  tipoPrestamo;
  estadoCombox: Combox[]
  frecuenciaPagoCombox: any[];

  constructor(
    public prestamoService: PrestamoService,
    public formBuilderService: FormsBuilderService,
    public comboxService: ComboxService,
    public alertService: AlertService,
    public toasMessageService: ToastMessage,
    public alertController: AlertController,
    public cuotaService : CuotaService
  ) { }

  ngOnInit() {
    this.prestamoForm = this.formBuilderService.getPrestamoForm();
    this.clienteForm = this.formBuilderService.getEditClientePrestamo();

    this.estadoCombox = this.comboxService.EstadoCombox;
    this.tipoPrestamo = this.comboxService.tipoPrestamo;
    this.frecuenciaPagoCombox = this.comboxService.frecuenciaPago;

    this.prestamoService.getPrestamoEdit().subscribe((prestamo) => {
      if (prestamo[0]) {
        this.prestamo = prestamo[0];
        this.clienteForm.patchValue(prestamo[0]);
        this.prestamoForm.patchValue(this.prestamo);
        this.prestamoForm.patchValue({ 'InteresGenerar': this.prestamo.InteresGenerar })
        this.prestamoForm.patchValue({ 'CantidadCuotas': this.prestamo.CantidadCuotas })
        console.log(JSON.stringify(prestamo[0]))
      }
    })

    this.cuotaService.getListCuota().subscribe((cuotas)=>{
       console.log("LISTA DE CUOTAS" + JSON.stringify(cuotas))
        this.cuotaList = cuotas;
    
    })


    this.prestamoService.calcularinteres(this.prestamoForm);
    this.prestamoService.setValidateCampos(this.prestamoForm)
    this.prestamoService.calcularCuota(this.prestamoForm)


  }


  async editPrestamo() {
    if (this.prestamoForm.invalid) {
      await this.toasMessageService.showClienteInvalid();
    } else {
      this.prestamoService.updatePrestamo(this.prestamo.Id, this.prestamoForm.getRawValue()).then(() => {
        this.alertService.alertSuccess("Prestamo")

      }).catch((err) => {
        console.log(JSON.stringify(err))
      })
    }
  }

  async eliminarPrestamo() {
    await this.alertConfirm()
  }



  async alertConfirm() {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      message: `<div> <p> ¿Estas seguro que desea eliminar este prestamo ? </p></div>`,
      buttons: [
        {
          text: 'Si',
          cssClass: 'secondary',
          handler: () => {

            this.prestamoService.deletePrestamoById(this.prestamo.Id).then(() => {
              this.alertService.alertEliminar("Prestamo");
            }).catch((err) => {
              console.log(JSON.stringify(err))
            })

          }
        },
        {
          text: 'No',
          handler: () => {

          }
        }
      ]
    });

    await alert.present();
  }


  actualizarCuota(cuota:Cuota){
    console.log(JSON.stringify(cuota))
    this.cuotaService.updateCuota(cuota.Id , cuota).then(()=>{
      this.toasMessageService.cuotaUpdate();
    })
  }

}
