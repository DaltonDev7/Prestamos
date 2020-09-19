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
            'Cedula':[null,[Validators.required,Validators.minLength(11)]],
            'Nombres':[null,[Validators.required]],
            'Apellidos':[null,[Validators.required]],
            'FechaNacimiento':[null,[Validators.required]],
            'Foto':[null],
            'Sexo':[null,[Validators.required]],
            'Direccion':[null,[Validators.required]],
            'Celular':[null,[Validators.required,Validators.minLength(10)]],
            'Ocupacion':[null,[Validators.required]],
            'Estado':[null,[Validators.required]],
            'Banco':[null,[Validators.required]],
            'TarjetaNo':[null],
            'Clave':[null],
            'Cuenta':[null],
        })
    }
    
    //Solo foto, Banco, tarjeta, clave y cuenta pueden ser null
    getPrestamoForm(){
        return this.fb.group({
            'CedulaCliente':[null,[Validators.required]],
            'NombresCliente':[{ value: null, disabled: true }],
            'IdCliente':[null],
            'Tipo':[null,[Validators.required]],
            'Fecha':[null,[Validators.required]],
            'Monto':[null,[Validators.required]],
            'CantidadCuotas':[null,[Validators.required]],
            'ValorCuotas':[null,[Validators.required]],
            'TotalPago':[null,[Validators.required]],
            'InteresGenerar':[null],
            'EstadoPrestamo':[null,[Validators.required]]
        })
    }

}