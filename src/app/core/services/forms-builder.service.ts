import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormsBuilderService {

    //atributos
    editFormsReadOnly: FormGroup;

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
            'IdCliente':[null],
            'Tipo':[null,[Validators.required]],
            'Fecha':[null],
            'Monto':[null,[Validators.required]],
            'frecuenciaPago':[null,[Validators.required]],
            'CantidadCuotas':[null,[Validators.required]],
            'ValorCuotas':[{ value: null, disabled: true }],
            'TotalPago':[{ value: null, disabled: true }],
            'InteresGenerar':[null,[Validators.required]],
            'EstadoPrestamo':[null,[Validators.required]]
        })
    }

    getClientePrestamo(){
        return this.fb.group({
           // 'Cedula':[null,[Validators.required]],
            'Nombres':[{ value: null, disabled: true }],
            'Apellidos':[{ value: null, disabled: true }],
            'Direccion':[{ value: null, disabled: true }],
            'Sexo':[{ value: null, disabled: true }],
            'Celular':[{ value: null, disabled: true }],
        })
    }

    getAddClientePrestamoBuilder(){
        return this.fb.group({
            ...this.getClientePrestamo().controls,
            'CedulaCliente':[null,[Validators.required]]
        })
    }

    getEditClientePrestamo(){
        return this.fb.group({
            ...this.getClientePrestamo().controls,
            'Cedula':[{ value: null, disabled: true }]
        })
    }

    getEstadosPrestamosForm(){
        return this.fb.group({
            'Estado':[null]
        })
    }

}