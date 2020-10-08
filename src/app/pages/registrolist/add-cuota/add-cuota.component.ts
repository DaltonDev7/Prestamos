import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Cuota } from 'src/app/core/interfaces/cuota';
import { Prestamo } from 'src/app/core/interfaces/prestamo';
import { ComboxService } from 'src/app/core/services/combox.service';
import { CuotaService } from 'src/app/core/services/cuota.service';
import { FormsBuilderService } from 'src/app/core/services/forms-builder.service';
import { PrestamoService } from 'src/app/core/services/prestamo.service';
import { ToastMessage } from 'src/app/core/services/toastmessages.service';

@Component({
  selector: 'app-add-cuota',
  templateUrl: './add-cuota.component.html',
  styleUrls: ['./add-cuota.component.scss'],
})
export class AddCuotaComponent implements OnInit {

  //atributos
  cuotaForm: FormGroup;
  estadoCuotaCombox: any[];
  prestamo: Prestamo;
  ultimaCuota: Cuota;


  constructor(
    public cuotaService: CuotaService,
    public formService: FormsBuilderService,
    public comboxService: ComboxService,
    public prestamoService: PrestamoService,
    private toasMessageService: ToastMessage
  ) { }

  ngOnInit() {
    this.cuotaForm = this.formService.getCuotaFormBuilder();
    this.estadoCuotaCombox = this.comboxService.estadoCuota;



    this.cuotaService.getListCuota().subscribe((cuotas) => {
      if (cuotas) {
        let size = cuotas.length - 1
        this.ultimaCuota = cuotas[size]
        console.log("dentro del add-cuota" + JSON.stringify(cuotas));
        console.log("ultima cuota" + JSON.stringify(this.ultimaCuota));
      }
    })

    this.prestamoService.getPrestamoEdit().subscribe((prestamo) => {
      if (prestamo[0]) {
        this.prestamo = prestamo[0];
        if(this.ultimaCuota != undefined){
          this.cuotaForm.get('CapitalInicial').patchValue(this.ultimaCuota.CapitalFinal)
        }else{
          this.cuotaForm.get('CapitalInicial').patchValue(this.prestamo.Monto)
        }
      }
    })

    


    this.calcularPagoInteres();
    this.calcularMontos();

  }


  saveCuota() {
    if (this.cuotaForm.invalid) {
      this.toasMessageService.showClienteInvalid();
    } else {
      this.cuotaForm.get('IdPrestamo').patchValue(this.prestamo.Id)

      this.cuotaService.addCuota(this.cuotaForm.getRawValue()).then(() => {
        this.cuotaForm.reset();
        this.toasMessageService.cuotaSave();
      })
    }
  }


  calcularPagoInteres() {

    if (this.ultimaCuota != undefined) {
      let capital = this.ultimaCuota.CapitalFinal;
      let interes = this.prestamo.InteresGenerar;
      let pagoInteres = capital * interes;
      pagoInteres = pagoInteres / 100;
      pagoInteres = this.cuotaService.setDecimales(pagoInteres);
      console.log("pago interes" + pagoInteres)
      this.cuotaForm.get('PagoInteres').patchValue(pagoInteres)

    } else {
      let capital = this.prestamo.Monto;
      let interes = this.prestamo.InteresGenerar;
      let pagoInteres = capital * interes;
      pagoInteres = pagoInteres / 100;
      pagoInteres = this.cuotaService.setDecimales(pagoInteres);
      console.log("pago interes" + pagoInteres)
      this.cuotaForm.get('PagoInteres').patchValue(pagoInteres)
    }

  }

  calcularMontos() {
    this.cuotaForm.get('Valor').valueChanges.subscribe((valorCuota) => {
      if (valorCuota) {

        var capitalInicial;
        var pagoInteres = this.cuotaForm.get('PagoInteres').value;
        
        var pagoCapital = this.cuotaService.setDecimales(valorCuota - pagoInteres)
        console.log("pago capital" + pagoCapital)
        var capitalFinal;

        if (this.ultimaCuota != undefined) {
          capitalInicial = this.ultimaCuota.CapitalFinal;
          capitalFinal =  this.cuotaService.setDecimales(capitalInicial - pagoCapital);
          console.log("capital final" + capitalFinal)
          this.cuotaForm.get('PagoCapital').patchValue(pagoCapital);
          this.cuotaForm.get('CapitalFinal').patchValue(capitalFinal);
        } else {
          capitalInicial = this.prestamo.Monto;
          capitalFinal =  this.cuotaService.setDecimales(capitalInicial - pagoCapital);
          console.log("capital final" + capitalFinal)
          this.cuotaForm.get('PagoCapital').patchValue(pagoCapital);
          this.cuotaForm.get('CapitalFinal').patchValue(capitalFinal);
        }

      }
    })
  }

}
