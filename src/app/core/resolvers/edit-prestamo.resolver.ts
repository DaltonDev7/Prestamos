import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { CuotaService } from '../services/cuota.service';
import { PrestamoService } from '../services/prestamo.service';


@Injectable({ providedIn: 'root' })
export class EditPrestamoResolver implements Resolve<any> {

    constructor(
        public prestamoService: PrestamoService,
        public cuotaService : CuotaService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.prestamoService.getPrestamoById(route.params.id);
        this.cuotaService.getCuotasByIdPrestamo(route.params.id);
    }
    
}