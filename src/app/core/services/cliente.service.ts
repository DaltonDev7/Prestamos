import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { take } from 'rxjs/operators';
import { BasedatosService } from './basedatos.service';
import { FormsBuilderService } from './forms-builder.service';
import { ToastMessage } from './toastmessages.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  //atributos
  cliente = new BehaviorSubject([]);
  clienteCedula = new BehaviorSubject([]);
  clienteprestamoReadOnly = new BehaviorSubject([]);
  clienteReadOnly;

  constructor(
    public baseDatosService: BasedatosService,
    public formBuilderService : FormsBuilderService,
    public toastService : ToastMessage
  ) { }

  getClienteById(Id: number) {
    this.baseDatosService.database.executeSql(`SELECT * FROM cliente WHERE Id = ${Id}`, [])
      .then((res) => {
        let items: any = [];

        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              Id: res.rows.item(i).Id,
              Cedula: res.rows.item(i).Cedula,
              Nombres: res.rows.item(i).Nombres,
              Apellidos: res.rows.item(i).Apellidos,
              FechaNacimiento: res.rows.item(i).FechaNacimiento,
              Foto: res.rows.item(i).Foto,
              Sexo: res.rows.item(i).Sexo,
              Direccion: res.rows.item(i).Direccion,
              Celular: res.rows.item(i).Celular,
              Ocupacion: res.rows.item(i).Ocupacion,
              Estado: res.rows.item(i).Estado,
              Banco: res.rows.item(i).Banco,
              TarjetaNo: res.rows.item(i).TarjetaNo,
              Clave: res.rows.item(i).Clave,
              Cuenta: res.rows.item(i).Cuenta,
              FechaCreacion: res.rows.item(i).FechaCreacion
            });
          }
        }

        this.cliente.next(items);
      }).catch((err) => {
        console.log("error al obtener cleinte" + JSON.stringify(err));
      })
  }

  getCliente() {
    return this.cliente.asObservable();
  }

  getClienteCedula() {
    return this.clienteCedula.asObservable()
  }

  getReadOnlyClientePrestamo(){
    return this.clienteprestamoReadOnly.asObservable()
  }


  getClienteByCedula(cedula) {
    return this.baseDatosService.database.executeSql(`SELECT * FROM cliente WHERE Cedula = '${cedula}'`, [])
      .then((res) => {
        let items: any = [];

        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              Id: res.rows.item(i).Id,
              Cedula: res.rows.item(i).Cedula,
              Nombres: res.rows.item(i).Nombres,
              Apellidos: res.rows.item(i).Apellidos,
              FechaNacimiento: res.rows.item(i).FechaNacimiento,
              Foto: res.rows.item(i).Foto,
              Sexo: res.rows.item(i).Sexo,
              Direccion: res.rows.item(i).Direccion,
              Celular: res.rows.item(i).Celular,
              Ocupacion: res.rows.item(i).Ocupacion,
              Estado: res.rows.item(i).Estado,
              Banco: res.rows.item(i).Banco,
              TarjetaNo: res.rows.item(i).TarjetaNo,
              Clave: res.rows.item(i).Clave,
              Cuenta: res.rows.item(i).Cuenta,
              FechaCreacion: res.rows.item(i).FechaCreacion
            });
          }
        }

        this.clienteCedula.next(items)
        this.clienteprestamoReadOnly.next(items);

      }).then(() => {
       // this.getDataPersonReadOnly();
      }).catch((err) => {
        console.log("error al obtener cleinte bt cedula" + JSON.stringify(err));
      })
  }


}