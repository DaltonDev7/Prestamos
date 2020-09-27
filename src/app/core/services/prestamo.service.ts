import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Prestamo } from '../interfaces/prestamo';
import { BasedatosService } from './basedatos.service';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  prestamo = new BehaviorSubject([]);
  prestamoEdit = new BehaviorSubject([]);

  constructor(
    public baseDatosService: BasedatosService
  ) { }



  loadPrestamo() {
    let query = `SELECT 
    cliente.Nombres , 
    cliente.Apellidos , 
    prestamo.Monto, 
    prestamo.Fecha, 
    prestamo.Id, 
    prestamo.EstadoPrestamo,
    prestamo.FechaCreacionPrestamo
    FROM prestamo
    inner join cliente on cliente.Id = prestamo.IdCliente 
    where EstadoPrestamo like '%ACTIVO%'
    `
    return this.baseDatosService.database.executeSql(query, []).then((res) => {
      let items: any = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            Id: res.rows.item(i).Id,
            Monto: res.rows.item(i).Monto,
            EstadoPrestamo: res.rows.item(i).EstadoPrestamo,
            FechaCreacionPrestamo: res.rows.item(i).FechaCreacionPrestamo,
            Nombres: res.rows.item(i).Nombres,
            Apellidos: res.rows.item(i).Apellidos
          });
        }
      }
      this.prestamo.next(items);
    }).catch((err) => {
      console.log("error al cargar prestamo" + JSON.stringify(err))
    })
  }

  getPrestamos() {
    return this.prestamo.asObservable()
  }

  getPrestamoEdit() {
    return this.prestamoEdit.asObservable()
  }


  addPrestamo(prestamo: Prestamo) {
    let FechaCreacionPrestamo = new Date()
    let data = [
      prestamo.IdCliente,
      prestamo.Tipo,
      prestamo.Fecha,
      prestamo.Hora,
      prestamo.Monto,
      prestamo.CantidadCuotas,
      prestamo.ValorCuotas,
      prestamo.TotalPago,
      prestamo.InteresGenerar,
      prestamo.EstadoPrestamo,
      FechaCreacionPrestamo
    ]

    return this.baseDatosService.database.executeSql(`INSERT INTO prestamo 
    (IdCliente, Tipo, Fecha, Hora,Monto,CantidadCuotas,ValorCuotas,TotalPago,InteresGenerar,EstadoPrestamo,
      FechaCreacionPrestamo) VALUES (?,?,?,?,?,?,?,?,?,?,?)`, data).then(res => {
      this.loadPrestamo();
    });
  }

  updatePrestamo(IdPrestamo: number, prestamo: Prestamo) {
    let data = [
      prestamo.Tipo,
      prestamo.Monto,
      prestamo.CantidadCuotas,
      prestamo.ValorCuotas,
      prestamo.TotalPago,
      prestamo.InteresGenerar,
      prestamo.EstadoPrestamo
    ]

    let query = `
    update prestamo set Tipo = ?, Monto = ? , CantidadCuotas = ? , ValorCuotas = ?,
    TotalPago = ? , InteresGenerar = ? , EstadoPrestamo = ? where Id = ${IdPrestamo}
    `

    return this.baseDatosService.database.executeSql(query, data).then(() => {
      this.loadPrestamo();
    })

  }


  getPrestamoById(IdPrestamo: number) {
    let query = `SELECT 
    c.Nombres , 
    c.Apellidos , 
    c.Cedula,
    c.Sexo,
    c.Direccion,
    c.Celular,
    p.Id, 
    p.Tipo,
    p.Monto, 
    p.CantidadCuotas,
    p.ValorCuotas,
    p.TotalPago,
    p.InteresGenerar,
    p.EstadoPrestamo,
    p.FechaCreacionPrestamo,
    p.Fecha
    FROM prestamo p
    LEFT JOIN cliente c on c.Id = p.IdCliente 
    where p.Id = ${IdPrestamo}
    `
    return this.baseDatosService.database.executeSql(query, []).then((res) => {
      let items: any = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            Id: res.rows.item(i).Id,
            Tipo: res.rows.item(i).Tipo,
            Monto: res.rows.item(i).Monto,
            CantidadCuotas: res.rows.item(i).CantidadCuotas,
            ValorCuotas: res.rows.item(i).ValorCuotas,
            TotalPago: res.rows.item(i).TotalPago,
            InteresGenerar: res.rows.item(i).InteresGenerar,
            EstadoPrestamo: res.rows.item(i).EstadoPrestamo,
            FechaCreacionPrestamo: res.rows.item(i).FechaCreacionPrestamo,
            Fecha: res.rows.item(i).Fecha,
            Nombres: res.rows.item(i).Nombres,
            Apellidos: res.rows.item(i).Apellidos,
            Cedula: res.rows.item(i).Cedula,
            Sexo: res.rows.item(i).Sexo,
            Direccion: res.rows.item(i).Direccion,
            Celular: res.rows.item(i).Celular
          });
        }
      }
      this.prestamoEdit.next(items);
    }).catch((err) => {
      console.log("error al cargar prestamo edit" + JSON.stringify(err))
    })


  }

  deletePrestamoById(idPrestamo: number) {
    return this.baseDatosService.database.executeSql(`DELETE FROM prestamo WHERE Id = ?`, [idPrestamo]).then(() => {
      this.loadPrestamo();
    })
  }

  calcularCuota(prestamoForm: FormGroup) {

    prestamoForm.get('CantidadCuotas').valueChanges.subscribe((cantidadCuotas) => {
      let montoPrestamo = prestamoForm.get('Monto').value;
      let interes = prestamoForm.get('InteresGenerar').value;
      let tiempoPagar = prestamoForm.get('TiempoPagar').value;

      interes = interes / tiempoPagar;
      console.log(interes)


      //se multiplica el monto por el interes
      let montoXinteres = montoPrestamo * interes;
      //luego se divide entre 100 para sacar el porcentaje
      let porcentaje = Math.round(montoXinteres / 100);
      // se saca el valor de cada cuota
      let valorCuota = cantidadCuotas * porcentaje;
      let totalPago = Math.round(montoPrestamo + valorCuota);
      valorCuota = Math.round(totalPago / cantidadCuotas);
      prestamoForm.get('ValorCuotas').patchValue(valorCuota);
      prestamoForm.get('TotalPago').patchValue(totalPago);



    })

  }

  setValidateCampos(prestamoForm: FormGroup) {



    prestamoForm.get('InteresGenerar').valueChanges.subscribe((interes) => {
      if (interes) {
        prestamoForm.get('Monto').enable();
        prestamoForm.get('Monto').setValue(null);

        prestamoForm.get('CantidadCuotas').setValue(null);
        prestamoForm.get('CantidadCuotas').disable();

        prestamoForm.get('TiempoPagar').setValue(null);
        prestamoForm.get('TiempoPagar').disable();
      }

    })

    prestamoForm.get('Monto').valueChanges.subscribe((monto) => {
      if (monto) {
        prestamoForm.get('TiempoPagar').setValue(null);
        prestamoForm.get('TiempoPagar').enable();
      }
    })

    prestamoForm.get('TiempoPagar').valueChanges.subscribe((data) => {
      if (data) {
        prestamoForm.get('CantidadCuotas').setValue(null);
        prestamoForm.get('CantidadCuotas').enable();
      }
    })






    // prestamoForm.get('Monto').valueChanges.subscribe((monto)=>{
    //   if(!monto){
    //     prestamoForm.get('ValorCuotas').setValue(null);
    //     prestamoForm.get('TotalPago').setValue(null);
    //     prestamoForm.get('CantidadCuotas').setValue(null);
    //   }
    // })



  }


  setDisabled(prestamoForm: FormGroup) {
    prestamoForm.get('Monto').disable();
    prestamoForm.get('CantidadCuotas').disable();
    prestamoForm.get('TiempoPagar').disable();

  }



}
