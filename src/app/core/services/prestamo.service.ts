import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Cuota } from '../interfaces/cuota';
import { Prestamo } from '../interfaces/prestamo';
import { BasedatosService } from './basedatos.service';
import { ValidatorFormsService } from './validator-forms.service';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  prestamo = new BehaviorSubject([]);
  prestamoEdit = new BehaviorSubject([]);
  lastPrestamo = new BehaviorSubject([]);

  constructor(
    public baseDatosService: BasedatosService,
    public validatorService: ValidatorFormsService
  ) { }



  loadPrestamo() {
    let query = `SELECT 
    cliente.Nombres , 
    cliente.Apellidos , 
    prestamo.Monto, 
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


  obtenerUltimoPrestamo() {
    return this.baseDatosService.database.executeSql(`select top 1 * from prestamo ORDER BY Id DESC`, [])
      .then((res) => {
        let items: any = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              Id: res.rows.item(i).Id,
              Tipo: res.rows.item(i).Tipo,
              Monto: res.rows.item(i).Monto,
              CantidadCuotas: res.rows.item(i).CantidadCuotas
            });
          }
        }
        this.lastPrestamo.next(items)
      }).catch((err) => {
        console.log("error al obtener el ultimo prestamo" + JSON.stringify(err))
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
      prestamo.Monto,
      prestamo.FrecuenciaPago,
      prestamo.InteresGenerar,
      prestamo.CantidadCuotas,
      prestamo.ValorCuotas,
      prestamo.MontoInteres,
      prestamo.TotalPago,
      prestamo.PagoCapital,
      prestamo.PagoInteres,
      prestamo.EstadoPrestamo,
      FechaCreacionPrestamo
    ]

    let cuota: Cuota[] = [

    ]
    let query = `INSERT INTO prestamo 
    ( IdCliente, 
      Tipo,
      Monto,
      FrecuenciaPago,
      InteresGenerar,
      CantidadCuotas,
      ValorCuotas,
      MontoInteres,
      TotalPago,
      PagoCapital,
      PagoInteres,
      EstadoPrestamo,
      FechaCreacionPrestamo) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    return this.baseDatosService.database.executeSql(query, data).then(res => {
      console.log("respuesta" + JSON.stringify(res))
      this.loadPrestamo();
    }).catch((err) => {
      console.log("errror en el prestamo service")
    });

  }



  updatePrestamo(IdPrestamo: number, prestamo: Prestamo) {
    let data = [
      prestamo.Tipo,
      prestamo.Monto,
      prestamo.FrecuenciaPago,
      prestamo.CantidadCuotas,
      prestamo.ValorCuotas,
      prestamo.MontoInteres,
      prestamo.TotalPago,
      prestamo.PagoCapital,
      prestamo.PagoInteres,
      prestamo.InteresGenerar,
      prestamo.EstadoPrestamo
    ]

    let query = `
    update prestamo set Tipo = ?, Monto = ? , FrecuenciaPago = ?, CantidadCuotas = ? , ValorCuotas = ?, MontoInteres = ?,
    TotalPago = ?, PagoCapital = ? , PagoInteres = ?, InteresGenerar = ? , EstadoPrestamo = ? where Id = ${IdPrestamo}
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
    p.FrecuenciaPago,
    p.PagoInteres,
    p.PagoCapital,
    p.CantidadCuotas,
    p.ValorCuotas,
    p.TotalPago,
    p.InteresGenerar,
    p.MontoInteres,
    p.EstadoPrestamo,
    p.FechaCreacionPrestamo
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
            FrecuenciaPago: res.rows.item(i).FrecuenciaPago,
            PagoInteres: res.rows.item(i).PagoInteres,
            PagoCapital: res.rows.item(i).PagoCapital,
            CantidadCuotas: res.rows.item(i).CantidadCuotas,
            ValorCuotas: res.rows.item(i).ValorCuotas,
            TotalPago: res.rows.item(i).TotalPago,
            InteresGenerar: res.rows.item(i).InteresGenerar,
            MontoInteres: res.rows.item(i).MontoInteres,
            EstadoPrestamo: res.rows.item(i).EstadoPrestamo,
            FechaCreacionPrestamo: res.rows.item(i).FechaCreacionPrestamo,
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
      if (cantidadCuotas) {

        let montoPrestamo = parseInt(prestamoForm.get('Monto').value)
        let interes = prestamoForm.get('InteresGenerar').value;
        let frecuenciaPago = prestamoForm.get('FrecuenciaPago').value;

        //CALCULANDO MONOTO INTERES
        let montoInteres = montoPrestamo * interes;
        montoInteres = montoInteres / 100;
        montoInteres = montoInteres * cantidadCuotas
        console.log(montoInteres)
        prestamoForm.get('MontoInteres').patchValue(montoInteres);

        //CALCULANDO PAGO TOTAL
        let pagoTotal = montoInteres + montoPrestamo
        prestamoForm.get('TotalPago').patchValue(pagoTotal)

        //CACULANDO VALOR CUOTA
        let valorCuota = pagoTotal / cantidadCuotas
        prestamoForm.get('ValorCuotas').patchValue(valorCuota)

        //CALCULANDO PAGO CAPITAL
        let pagoCapital = montoPrestamo / cantidadCuotas
        prestamoForm.get('PagoCapital').patchValue(pagoCapital);

        //CALCULANDO PAGO INTERES
        let pagoInteres = interes * montoPrestamo
        pagoInteres = pagoInteres / 100;
        prestamoForm.get('PagoInteres').patchValue(pagoInteres);



      }


      /*
      interes


      monto interes
      sacarle el porcento al capital(monto) * cuota

      pago total
      es la suma de monto interes + capital(monto)

      valor cuota
      total pago / cantidad cuota

      pago capital
      capital / numero de cuota

      pago interes 
      interes / cantida de cuota
      ---------------------------------------------------------------
      LO UNICO QUE SE SABE
      INDEFINIDO
      INTERES: EJ 9%
      PAGO INTERES : INTERES(SACARLE EL PORCENTAJE) * CAPITAL

      -------------------------------------------------------------------------
      CUOTAS
      IDPRESTAMO : ES EL ID DE LA TABLA PRESTAMO
      NO : ES EL NUM DE LA CUOTA
      FECHA: ES LA FECHA DONDE SE VA A PAGAR
      CAPITAL: ES EL MONTO QUE SE PRESTO
      VALOR :ES EL VALOR DE LA CUOTA
      PAGO CAPITAL : ES LA DIVISION ENTRE MONTO / NUMERO DE CUOTAS
      PAGO INTERES : ES LA DIVISION INTERES / CANTUDAD CUOTA
      CAPITAL FINAL : ES LA RESTA CAPITAL INICIAL - PAGO CAPITAL

      ----------------------------------------------------------------------------
      LO UNICO QUE SE SABE
      CUOTAS INDEFINIDO
      CAPITAL: ES EL MONTO QUE SE PRESTO
      PAGO INTERES : INTERES(SACARLE EL PORCENTAJE) * CAPITAL
      VALOR : DEPENDE DE LA CATIDAD DEL CLIENTE ( EJ: 4000  )
      PAGO CAPITAL : VALOR DE LA CUOTA - PAGO INTERES  
      CAPITAL FINAL : MONTO - PAGO CAPITAL

      
      */


      // se multiplica el monto por el interes
      // let montoXinteres = montoPrestamo * interes;
      // //luego se divide entre 100 para sacar el porcentaje
      // let porcentaje = Math.round(montoXinteres / 100);
      // // se saca el valor de cada cuota
      // let valorCuota = cantidadCuotas * porcentaje;
      // console.log(valorCuota)
      // let totalPago = Math.round(montoPrestamo + valorCuota);
      // console.log(totalPago)
      // valorCuota = totalPago / cantidadCuotas
      // console.log(valorCuota)
      // prestamoForm.get('ValorCuotas').patchValue(valorCuota);
      // prestamoForm.get('TotalPago').patchValue(totalPago);
    })

  }

  saveCuotas() {

  }



  setValidateCampos(prestamoForm: FormGroup) {

    prestamoForm.get('Tipo').valueChanges.subscribe((data) => {
      if (data) {
        console.log(data)
        let monto = prestamoForm.get('Monto');
        this.validatorService.setEnableControlsRequired([monto]);
        this.setAllCamposPrestamosNull(prestamoForm)
      } else {
        this.setAllCamposPrestamosNull(prestamoForm)
      }
    })


    prestamoForm.get('Monto').valueChanges.subscribe((data) => {

      if (data) {
        let tipo = prestamoForm.get('Tipo').value;
        if (tipo == 1) {
          let frecuenciaPago = prestamoForm.get('FrecuenciaPago')
          this.validatorService.setEnableControlsRequired([frecuenciaPago]);
        }
        if (tipo == 2) {
          let interes = prestamoForm.get('InteresGenerar');
          this.validatorService.setEnableControlsRequired([interes]);
        }

      } else {
        let frecuenciaPago = prestamoForm.get('FrecuenciaPago')
        let interes = prestamoForm.get('InteresGenerar');
        let cantidaCuota = prestamoForm.get('CantidadCuotas');
        this.validatorService.setDisabledControls([frecuenciaPago, interes, cantidaCuota])
      }




    })

    prestamoForm.get('InteresGenerar').valueChanges.subscribe((interes) => {
      if (interes) {
        let tipo = prestamoForm.get('Tipo').value;
        if (tipo == 1) {
          console.log(interes)
          let cantidaCuota = prestamoForm.get('CantidadCuotas');
          this.validatorService.setEnableControlsRequired([cantidaCuota]);
        }
        if (tipo == 2) {

          let montoPrestamo = prestamoForm.get('Monto').value
          let pagoInteres = interes * montoPrestamo
          pagoInteres = pagoInteres / 100;
          prestamoForm.get('PagoInteres').patchValue(pagoInteres);
        }

      }
    })

  }


  calcularinteres(prestamoForm: FormGroup) {
    //  interes = 40
    /*
      diario = interes / 30.5 
      semanal = interes / 4
      quincenal = interes / 2
      mensual  = interes / 1

    */
    prestamoForm.get('FrecuenciaPago').valueChanges.subscribe((frecuenciaPago) => {
      if (frecuenciaPago) {

        const interes = 40;
        let interesFormat = interes / frecuenciaPago;
        interesFormat = Math.round(interesFormat * 100) / 100;

        prestamoForm.get('InteresGenerar').enable();
        prestamoForm.get('InteresGenerar').patchValue(interesFormat);

        let cantidaCuota = prestamoForm.get('CantidadCuotas');
        this.validatorService.setEnableControlsRequired([cantidaCuota]);
      } else {
        let cantidaCuota = prestamoForm.get('CantidadCuotas');
        this.validatorService.setDisabledControls([cantidaCuota])
      }
    })

  }

  setAllCamposPrestamosNull(prestamoForm: FormGroup) {
    let frecuenciaPago = prestamoForm.get('FrecuenciaPago');
    let interes = prestamoForm.get('InteresGenerar');
    let cantidaCuota = prestamoForm.get('CantidadCuotas');
    // let monto = prestamoForm.get('Monto');
    let valorCuota = prestamoForm.get('ValorCuotas');
    let montoInteres = prestamoForm.get('MontoInteres');
    let totalPago = prestamoForm.get('TotalPago');
    let pagoCapital = prestamoForm.get('PagoCapital');
    let pagoInteres = prestamoForm.get('PagoInteres');

    this.validatorService.setDisabledControls(
      [frecuenciaPago, interes, cantidaCuota,
        valorCuota, montoInteres, totalPago, pagoCapital, pagoInteres])
  }



}
