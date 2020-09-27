import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public router : Router,
    public alertController: AlertController
  ) {}



  ngOnInit(): void {

    let prestamo = 517;
    let interes = 32; // si es mensual
    
    let multiplicando = prestamo * interes;
    let porcentaje = Math.round(multiplicando / 100)   

    console.log(porcentaje)



    let FechaCreacionPrestamo = new Date()

    console.log(FechaCreacionPrestamo)

  }

}
