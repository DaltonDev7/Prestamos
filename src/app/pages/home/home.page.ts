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



  fecha;
  fecha2;
  cuotaList;
  constructor(
    public router: Router,
    public alertController: AlertController
  ) { }



  ngOnInit(): void {


    let numeroDecimal = "4520.59"
    console.log(numeroDecimal)

    let convert = +numeroDecimal
    console.log(convert)
   

   
    this.cuotaList = [
      {
        id:1,
        nombre:"dalton",
        apellidos:"tejada",
        tel:"809-016-5161"
      },
      {
        id:1,
        nombre:"nicole",
        apellidos:"peguero",
        tel:"809-016-0001"
      },
      {
        id:1,
        nombre:"diego tejada",
        apellidos:"tejada",
        tel:"589-556-5161"
      }
    ]


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
