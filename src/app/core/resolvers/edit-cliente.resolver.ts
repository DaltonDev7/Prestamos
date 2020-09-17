import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ClienteService } from '../services/cliente.service';
import { take, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EditClienteResolver implements Resolve<any> {

    constructor(
        public clienteService: ClienteService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
       this.clienteService.getClienteById(route.params.id);
    }
}