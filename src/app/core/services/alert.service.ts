import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PrestamoService } from './prestamo.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public router: Router,
    public alertController: AlertController,
    private prestamoService : PrestamoService
  ) { }


  async alertSuccess(titulo:string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      header: titulo,
      message: 'Datos actualizados',
      buttons: [
        {
          text: 'Volver',
          cssClass: 'secondary',
          handler: () => {
            let currentRoute = this.router.url.split('/');
            currentRoute.pop();
            currentRoute.pop();
            this.router.navigate([currentRoute.join('/')]);
          }
        },
        {
          text: 'Quedarme',
          handler: () => {
          
          }
        }
      ]
    });

    await alert.present();

  }


  async alertEliminar(mensaje:string) {
    const alert = await this.alertController.create({
      backdropDismiss: false,
      cssClass: 'my-custom-class',
      message: `<div> <p> ${mensaje} eliminado </p></div>`,
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'secondary',
          handler: () => {
            let currentRoute = this.router.url.split('/');
            currentRoute.pop();
            currentRoute.pop();
            this.router.navigate([currentRoute.join('/')]);
          }
        }
      ]
    });

    await alert.present();

  }

  









}
