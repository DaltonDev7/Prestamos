import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { PrestamoService } from '../services/prestamo.service';


@Injectable({ providedIn: 'root' })
export class EditPrestamoResolver implements Resolve<any> {

    constructor(
        public prestamoService: PrestamoService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.prestamoService.getPrestamoById(route.params.id)
    }
    
}