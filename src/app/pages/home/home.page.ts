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
  constructor(
    public router: Router,
    public alertController: AlertController
  ) { }



  ngOnInit(): void {

    // var dalton = moment();


    

    // this.fecha = moment().format('DD/MM/YYYY HH:mm:ss')


    // //this.fecha2 = moment().add(5, 'months').format('DD/MM/YYYY')

    // console.log(moment().add(4 , 'days').format('DD/MM/YYYY HH:mm:ss')) 

    // var days = 0;
    // for(var i = 0; i <= 3; i++){
    //   days += 15;
    //   this.fecha2 = moment().add(days, 'days').format('DD/MM/YYYY HH:mm:ss')
    //   console.log( this.fecha2)
    // }


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
