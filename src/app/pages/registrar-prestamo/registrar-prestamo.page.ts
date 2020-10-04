import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cliente } from 'src/app/core/interfaces/cliente';
import { Combox } from 'src/app/core/interfaces/combox';
import { ClienteService } from 'src/app/core/services/cliente.service';
import { ComboxService } from 'src/app/core/services/combox.service';
import { FormsBuilderService } from 'src/app/core/services/forms-builder.service';
import { PrestamoService } from 'src/app/core/services/prestamo.service';
import { ToastMessage } from 'src/app/core/services/toastmessages.service';
import * as momentJs from 'moment';
import { FrecuciaPago } from 'src/app/core/enums/frecuenciaPago.enum';
import { Prestamo } from 'src/app/core/interfaces/prestamo';

@Component({
  selector: 'app-registrar-prestamo',
  templateUrl: './registrar-prestamo.page.html',
  styleUrls: ['./registrar-prestamo.page.scss'],
})
export class RegistrarPrestamoPage implements OnInit {

  //ATRIBUTOS
  prestamoForm: FormGroup;
  clienteForm: FormGroup;
  cliente: Cliente;
  prestamo: Prestamo;
  cedula;

  estadoCombox: Combox[];
  tipoPrestamo: any[];
  frecuenciaPagoCombox: any[];

  permiso = false;

  constructor(
    public prestamoService: PrestamoService,
    public comboxService: ComboxService,
    public formBuilderServices: FormsBuilderService,
    private clienteService: ClienteService,
    public toastService: ToastMessage) { }

  ngOnInit() {
    this.prestamoForm = this.formBuilderServices.getPrestamoForm();
    this.clienteForm = this.formBuilderServices.getAddClientePrestamoBuilder();

    this.prestamoForm.get('InteresGenerar').disable();

    this.estadoCombox = this.comboxService.EstadoCombox;
    this.tipoPrestamo = this.comboxService.tipoPrestamo;
    this.frecuenciaPagoCombox = this.comboxService.frecuenciaPago;

    this.clienteForm.get('CedulaCliente').valueChanges.subscribe((data) => {
      console.log(data.length)
      console.log(data)
      if (data.length == 11) {
        this.clienteService.getClienteByCedula(data).then(() => {
          this.getData();
        })
      }
    })

    var dalton = momentJs().format('DD/MM/YYYY HH:mm:ss');
    console.log("fecha dalton " + dalton)


    if (this.clienteService.clienteReadOnly != null) {
      this.cliente = this.clienteService.clienteReadOnly;
    }

    this.prestamoService.calcularinteres(this.prestamoForm);
    this.prestamoService.setValidateCampos(this.prestamoForm)
    this.prestamoService.calcularCuota(this.prestamoForm)



  }

  getData() {
    this.clienteService.getClienteCedula().subscribe((cliente) => {
      console.log("obteniedo datos " + JSON.stringify(cliente))
      if (cliente[0]) {
        this.cliente = cliente[0];
        this.clienteForm.patchValue(this.cliente);
      } else {
        this.clienteForm.get('Nombres').setValue(null);
        this.clienteForm.get('Apellidos').setValue(null);
        this.clienteForm.get('Direccion').setValue(null);
        this.clienteForm.get('Sexo').setValue(null);
        this.clienteForm.get('Celular').setValue(null);
        this.toastService.cedulaNotFound();
      }

    })
  }




  async savePrestamo() {
    if (this.prestamoForm.invalid || this.clienteForm.invalid) {
      await this.toastService.showClienteInvalid();
    } else {

      this.prestamoForm.patchValue({ 'IdCliente': this.cliente.Id });
      this.prestamoService.addPrestamo(this.prestamoForm.getRawValue()).then((data) => {
        //this.saveCuotas();
        // this.insertDatos();
        this.prestamoForm.reset();
        this.toastService.showMessagePrestamoSaved();
      }).catch((err) => {
        console.log("error al guardar prestamo" + JSON.stringify(err))
      })
    }
  }

  public saveCuotas() {

    var fechaPago;
    var dalton = momentJs().format('DD/MM/YYYY HH:mm:ss');
    console.log("fecha dalton " + dalton)

      this.prestamoService.getUltimoPrestamo().subscribe((data) => {
        if (data != undefined) {
          this.prestamo = data[0]
          this.permiso = true;
          console.log("ultimo prestamo" + JSON.stringify(this.prestamo))


          var cantidadDaysOrMonths = 0;
          var mesOrDia = 0;

          if (this.prestamo) {
            for (let i = 0; i < this.prestamo.CantidadCuotas; i++) {

              switch (this.prestamo.FrecuenciaPago) {
                case FrecuciaPago.DIARIO:
                  cantidadDaysOrMonths += 1;
                  mesOrDia = 1
                  break;
                case FrecuciaPago.SEMANAL:
                  cantidadDaysOrMonths += 7;
                  mesOrDia = 1
                  break;
                case FrecuciaPago.QUINCENAL:
                  cantidadDaysOrMonths += 15;
                  mesOrDia = 1
                  break;
                case FrecuciaPago.MENSUAL:
                  cantidadDaysOrMonths += 1;
                  mesOrDia = 2
                  break;
              }

              if (mesOrDia == 1) {
                fechaPago = momentJs().add(cantidadDaysOrMonths, 'days').format('DD/MM/YYYY HH:mm:ss');
              } else {
                fechaPago = momentJs().add(cantidadDaysOrMonths, 'months').format('DD/MM/YYYY HH:mm:ss');
              }
              console.log(cantidadDaysOrMonths)
              console.log(fechaPago)

            }
          }


        }
      }, (err) => console.log(JSON.stringify(" errorarso" + err)))
  }




  insertDatos() {

    var cantidadDaysOrMonths = 0;
    var mesOrDia = 0;
    var fechaPago;
    if (this.prestamo) {
      for (let i = 0; i < this.prestamo.CantidadCuotas; i++) {

        switch (this.prestamo.FrecuenciaPago) {
          case FrecuciaPago.DIARIO:
            cantidadDaysOrMonths += 1;
            mesOrDia = 1
            break;
          case FrecuciaPago.SEMANAL:
            cantidadDaysOrMonths += 7;
            mesOrDia = 1
            break;
          case FrecuciaPago.QUINCENAL:
            cantidadDaysOrMonths += 15;
            mesOrDia = 1
            break;
          case FrecuciaPago.MENSUAL:
            cantidadDaysOrMonths += 15;
            mesOrDia = 2
            break;
        }

        if (mesOrDia == 1) {
          fechaPago = momentJs().add(cantidadDaysOrMonths, 'days').format('DD/MM/YYYY HH:mm:ss');
        } else {
          fechaPago = momentJs().add(cantidadDaysOrMonths, 'months').format('DD/MM/YYYY HH:mm:ss');
        }
        console.log(cantidadDaysOrMonths)
        console.log(fechaPago)

      }
    }
  }



}
