import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
    providedIn: 'root'
})
export class ToastMessage {
    constructor(
        public toastController: ToastController
    ) { }



    async showClienteInvalid() {
        const toast = await this.toastController.create({
            message: 'Aun faltan campos por completar',
            position: 'bottom',
            duration: 3000
        });
        return toast.present();
    }

     async showMessageClienteSaved() {
         const toast = await this.toastController.create({
            message: 'Cliente Registrado',
            position: 'bottom',
            duration: 3000
        });
        return toast.present();
    }



}