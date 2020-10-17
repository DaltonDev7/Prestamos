import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';
import { BasedatosService } from 'src/app/core/services/basedatos.service';
import { CuotaService } from 'src/app/core/services/cuota.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  //atributos
  diaActual;
  cuotaList: any[] = [];
  cuotaListPasadas: any[] = [];
  permiso: boolean = false
  fechaActual;


  constructor(
    public router: Router,
    public cuotaService: CuotaService,
    public baseDatosService: BasedatosService,
    public alertController: AlertController
  ) { }



  ngOnInit(): void {

    moment.locale('es');
    this.diaActual = moment().format('ll')


    this.fechaActual = '2020-10-16'










    // var getDaysArray = function (year, month) {
    //   var names = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    //   var date = new Date(year, month - 1, 1);
    //   var result = [];
    //   while (date.getMonth() == month - 1) {
    //     result.push(date.getDate() + "-" + names[date.getDay()])
    //     date.setDate(date.getDate() + 1)
    //   }
    //   return result;
    // }

    // console.log( getDaysArray(2020 , 10))

    // this.cuotaService.getAllCuotas();

    this.baseDatosService.getCuotas().subscribe((cuotas) => {
      console.log("fuera dle metodo" + JSON.stringify(cuotas))
      if (cuotas[0]) {
        console.log(JSON.stringify(cuotas))
        this.cuotaList = cuotas;
      }
    })


    this.baseDatosService.getCuotasPosteriores().subscribe((cuotas) => {
      if (cuotas != null) {
        console.log(JSON.stringify(cuotas))
        this.cuotaListPasadas = cuotas;
      }
    })


  }

  /* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
  sumarDias(fecha: Date, dias) {
    fecha.setDate(fecha.getDate() + dias)
    console.log("dias " + fecha)
    return fecha;
  }

  sumarMeses(fecha: Date, meses) {
    fecha.setMonth(fecha.getMonth() + meses)

    console.log("meses " + fecha)
    return fecha;
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

}
