import { Injectable } from '@angular/core';
import { BasedatosService } from './basedatos.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Cuota } from '../interfaces/cuota';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class CuotaService {


    cuotaList = new BehaviorSubject([]);

    constructor(
        public baseDatosService: BasedatosService,
    ) { }


    addCuota(cuota:Cuota){
        var FechaCreacionCuota = moment().format('DD/MM/YYYY');
        var FechaPago  = moment().format('DD/MM/YYYY');
        let data = [
            cuota.IdPrestamo,
            cuota.FechaPago,
            cuota.CapitalInicial,
            cuota.Valor,
            cuota.PagoCapital,
            cuota.PagoInteres,
            cuota.CapitalFinal,
            cuota.EstadoCuota,
            FechaCreacionCuota
        ]

        let query = `INSERT INTO cuota(
            IdPrestamo,
            FechaPago,
            CapitalInicial,
            Valor,
            PagoCapital,
            PagoInteres,
            CapitalFinal,
            EstadoCuota,
            FechaCreacionCuota) VALUES (?,?,?,?,?,?,?,?,?) `

            return this.baseDatosService.database.executeSql(query , data).then(()=>{
                console.log('insertado')
            }).catch((err) => { console.log(JSON.stringify(err))})
    }


    getCuotasByIdPrestamo(IdPrestamo: number) {
        let query = `SELECT * FROM cuota WHERE IdPrestamo = ${IdPrestamo}`;
       //let query = `SELECT * FROM cuota`;
       console.log("id del prestamo actual" + IdPrestamo)

        return this.baseDatosService.database.executeSql(query, []).then((res) => {
            let items: any = [];
            if (res.rows.length > 0) {
                for (var i = 0; i < res.rows.length; i++) {
                    items.push({
                        Id: res.rows.item(i).Id,
                        IdPrestamo: res.rows.item(i).IdPrestamo,
                        FechaPago: res.rows.item(i).FechaPago,
                        CapitalInicial: res.rows.item(i).CapitalInicial,
                        Valor: res.rows.item(i).Valor,
                        PagoCapital: res.rows.item(i).PagoCapital,
                        PagoInteres: res.rows.item(i).PagoInteres,
                        CapitalFinal: res.rows.item(i).CapitalFinal,
                        EstadoCuota : res.rows.item(i).EstadoCuota,
                        FechaCreacionCuota: res.rows.item(i).FechaCreacionCuota
                    });
                }
            }
            this.cuotaList.next(items);
        }).catch((err)=>{
            console.log("errror al obtener cuotas" + err)
        })
    }

    getListCuota(){
        return this.cuotaList.asObservable();
    }

    updateCuota(IdCuota:number, cuota:Cuota){
        let query = `UPDATE cuota SET EstadoCuota = ? WHERE Id = ${IdCuota}`;

        var cuotaEstadoUpdate = 0;
        if(cuota.EstadoCuota == 2){
            cuotaEstadoUpdate = 1
        }else{
            cuotaEstadoUpdate = 2
        }

        let data = [
            cuotaEstadoUpdate
        ]

        return this.baseDatosService.database.executeSql(query , data).then(()=>{
            console.log("estado cuota actulizado")
            this.getCuotasByIdPrestamo(cuota.IdPrestamo)
        })
    }

    deleteCuota(IdCuota:number, IdPrestamo:number){
        let query = `DELETE FROM cuota WHERE Id = ?`
        return this.baseDatosService.database.executeSql(query, [IdCuota]).then(()=>{
            this.getCuotasByIdPrestamo(IdPrestamo);
        })
    }



    setDecimales(valor:number){
        //primero lo convertimos a string
        var valorString = valor.toString();
        //luego establecemos que solo queremos 2 numeros despues del punto
        var resultado = parseFloat(valorString).toFixed(2);
        // lo convertimos a number otra vez
        var resultadoFormat = +resultado
        console.log("resutlado formateado" + resultadoFormat)
        return resultadoFormat;
    }



}