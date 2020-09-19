import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Prestamo } from '../interfaces/prestamo';
import { BasedatosService } from './basedatos.service';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  prestamo = new BehaviorSubject([]);

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
    }).catch((err)=>{
      console.log("error al cargar prestamo" + JSON.stringify(err))
    })
  }

  getPrestamos(){
   return this.prestamo.asObservable().pipe(take(1))
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

}
