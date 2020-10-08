import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';
import { CuotaService } from 'src/app/core/services/cuota.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  //atributos
  diaActual;
  cuotaList;



  constructor(
    public router: Router,
    public cuotaService : CuotaService,
    public alertController: AlertController
  ) { }



  ngOnInit(): void {

    moment.locale('es');
    this.diaActual = moment().format('ll')



    // this.cuotaService.getCuotas().subscribe((cuotas)=>{
    //   if (cuotas) {
    //     this.cuotaList = cuotas;
    //   }
    // })

    



    let numeroDecimal = "4520.59"
    console.log(numeroDecimal)

    let convert = +numeroDecimal
    console.log(convert)
   


  }

  /* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
  sumarDias(fecha:Date, dias) {
    fecha.setDate(fecha.getDate() + dias);
    console.log("dias "+fecha)
    return fecha;
  }

  sumarMeses(fecha:Date,meses){
    fecha.setMonth(fecha.getMonth() + meses)
    console.log("meses " +fecha)
    return fecha;
  }

}
