import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  fechaJs:Date;

  constructor(
    public router: Router,
    public alertController: AlertController
  ) { }



  ngOnInit(): void {


    this.fechaJs = new Date();

    var fecha = moment().format('DD/MM/YYYY');
   // console.log(fecha)

   // var fecha = new Date();
    console.log(fecha);

    this.fechaJs = this.sumarMeses(this.fechaJs , 3)

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
