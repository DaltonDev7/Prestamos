import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { CuotaService } from '../services/cuota.service';
import { PrestamoService } from '../services/prestamo.service';


@Injectable({ providedIn: 'root' })
export class EditPrestamoResolver implements Resolve<any> {

    constructor(
        public prestamoService: PrestamoService,
        public cuotaService : CuotaService,
        private router: Router
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // let idPrestamo = this.router.getCurrentNavigation().extras
        // console.log(JSON.stringify(idPrestamo))
        // if(idPrestamo != undefined){
        //     this.prestamoService.getPrestamoById(idPrestamo)
        // }else{
        // }
        this.prestamoService.getPrestamoById(route.params.id);
        this.cuotaService.getCuotasByIdPrestamo(route.params.id);
    }
    
}