import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormsBuilderService {

    constructor(
        public fb : FormBuilder
    ){}


    getClienteBuilder(){
        return this.fb.group({
            'Cedula':[null,[Validators.required]],
            'Nombres':[null,[Validators.required]],
            'Apellidos':[null,[Validators.required]],
            'FechaNacimiento':[null,[Validators.required]],
            'Foto':[null],
            'Sexo':[null],
            'Direccion':[null,[Validators.required]],
            'Celular':[null,[Validators.required]],
            'Ocupacion':[null],
            'Estado':[null,[Validators.required]],
            'Banco':[null],
            'TarjetaNo':[null],
            'Clave':[null],
            'Cuenta':[null,[Validators.required]],
        })
    }

}