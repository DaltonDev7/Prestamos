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

    async showMessagePrestamoSaved() {
        const toast = await this.toastController.create({
            message: 'Prestamo Registrado',
            position: 'bottom',
            duration: 3000
        });
        return toast.present();
    }

    async showMessageClienteUpdate() {
        const toast = await this.toastController.create({
            message: 'Cliente Actualizado Correctamente',
            position: 'bottom',
            duration: 3000
        });
        return toast.present();
    }

    async showMessagePrestamoUpdate() {
        const toast = await this.toastController.create({
            message: 'Prestamo Actualizado Correctamente',
            position: 'bottom',
            duration: 3000
        });
        return toast.present();
    }

    async showMessageClienteDelete() {
        const toast = await this.toastController.create({
            message: 'Cliente Eliminado',
            position: 'bottom',
            duration: 3000
        });
        return toast.present();
    }

    async cedulaNotFound() {
        const toast = await this.toastController.create({
            message: 'Esta cedula aun no esta registrada',
            position: 'bottom',
            duration: 3000
        });
        return toast.present();
    }

    async cedulaExist() {
        const toast = await this.toastController.create({
            message: 'Esta cedula ya esta registrada',
            position: 'bottom',
            duration: 3000
        });
        return toast.present();
    }

    async cuotaUpdate() {
        const toast = await this.toastController.create({
            message: 'Cuota actualizada',
            position: 'bottom',
            duration: 3000
        });
        return toast.present();
    }











}