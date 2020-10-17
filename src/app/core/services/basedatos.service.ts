import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { Cliente } from '../interfaces/cliente';
import { take } from 'rxjs/operators';
import { CuotaService } from './cuota.service';
import * as moment from 'moment';
import { FormatService } from './formar.service';

@Injectable({
  providedIn: 'root'
})
export class BasedatosService {

  //ATRIBUTOS
  public database: SQLiteObject;
  public dbReady = new BehaviorSubject<boolean>(false);
  clienteList = new BehaviorSubject([]);
  allCuotas =  new BehaviorSubject([]);
  allCuotasPosteriores  =  new BehaviorSubject([]);

  constructor(
    private platform:Platform, 
    private sqlite: SQLite,
    private sqlitePorter : SQLitePorter,
    public http: HttpClient,
    public formatService : FormatService
   // public cuotaService: CuotaService
    ) { 
      this.platform.ready().then((x)=>{
        console.log(JSON.stringify(x))
        console.log("a crear la base de datos")
        this.sqlite.create({
          name:'iiiyb.db',
          location :'default'
        })
        .then((db:SQLiteObject )=>{
          this.database = db;
          console.log('base de datos creada maldita sea')
          this.seedDataBase();
        })
      }).catch((e)=>{
        console.log(e)
      })
     }

    seedDataBase(){
      console.log("insertando querys")
      this.http.get('assets/seed.sql', {responseType: 'text'}).subscribe((sql)=>{
        console.log("insentar la base de datos y el sql")
        this.sqlitePorter.importSqlToDb(this.database, sql).then(()=>{
          console.log("querys insertado.")
          this.dbReady.next(true);
          console.log("ya esta true")
          let fechaActual =  new Date();
          let fechaFormat = this.formatService.formatDate(fechaActual)
          this.getAllCuotas(fechaFormat);
          this.getAllCuotasPosteriores(fechaFormat)
         
        }).catch(e => console.error(JSON.stringify(e)))
      })  
    }

    getDataBaseState(){
      return this.dbReady.asObservable();
    }

    loadCliente(){
      return this.database.executeSql('SELECT * FROM cliente ORDER BY FechaCreacion DESC', []).then((res)=>{
        let items:any = [];
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
              FechaCreacion : res.rows.item(i).FechaCreacion
             });
          }
        }
        this.clienteList.next(items);
      })
    }

    getClientes(){
      return this.clienteList.asObservable()
    }

    addCliente(cliente : Cliente){

      let  FechaCreacion = new Date()

      let data = [
        cliente.Cedula,
        cliente.Nombres, 
        cliente.Apellidos,
        cliente.FechaNacimiento,
      //  cliente.Foto,
        cliente.Sexo,
        cliente.Direccion,
        cliente.Celular,
        cliente.Ocupacion,
        cliente.Estado,
        cliente.Banco,
        cliente.TarjetaNo,
        cliente.Clave,
        cliente.Cuenta,
        FechaCreacion
      ];
      return this.database.executeSql(`INSERT INTO cliente 
      (Cedula, Nombres, Apellidos, FechaNacimiento,Sexo,Direccion,Celular,Ocupacion,
       Estado,Banco,TarjetaNo,Clave,Cuenta,FechaCreacion) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, data).then(res => {
        this.loadCliente();
      });
    }

    updateCliente(IdCliente: number , cliente:Cliente){
      let data = [
        cliente.Cedula,
        cliente.Nombres, 
        cliente.Apellidos,
        cliente.FechaNacimiento,
       // cliente.Foto,
        cliente.Sexo,
        cliente.Direccion,
        cliente.Celular,
        cliente.Ocupacion,
        cliente.Estado,
        cliente.Banco,
        cliente.TarjetaNo,
        cliente.Clave,
        cliente.Cuenta
      ];

      return this.database.executeSql(`UPDATE cliente SET 
       Cedula = ?, Nombres = ?, Apellidos = ?, FechaNacimiento = ?,  Sexo= ?,
       Direccion = ? ,Celular = ? , Ocupacion = ? , Estado = ? , Banco = ? , TarjetaNo = ?,
       Clave = ? , Cuenta = ? WHERE Id = ${IdCliente}`, data).then(()=>{
        this.loadCliente();
       })
    }

    deleteCliente(idCliente : number){
      return this.database.executeSql('DELETE FROM cliente WHERE Id = ?', [idCliente]).then(()=>{
        this.loadCliente();
      })
    }


    
    getAllCuotas(fechaActual){
      //let query = `SELECT * FROM cuota WHERE FechaPago > '${fechaActual}' ORDER BY FechaPago DESC LIMIT 10`

      let query2 = `SELECT 
      c.Id,
      c.Nombres,
      c.Cedula,
      p.Id,
      p.IdCliente,
      p.Monto,
      p.ValorCuotas,
      cu.IdPrestamo,
      cu.FechaPago,
      cu.EstadoCuota,
      cu.FechaCreacionCuota
      FROM cuota cu
      inner join prestamo p
      on p.Id = cu.IdPrestamo
      inner join cliente c
      on c.Id = p.IdCliente
      WHERE cu.FechaPago  >=  '${fechaActual}' ORDER BY FechaPago ASC
      `
      //let query = `SELECT * FROM cuota`;

      return this.database.executeSql(query2 , []).then((res)=>{
          let items: any = [];
          if (res.rows.length > 0) {
              for (var i = 0; i < res.rows.length; i++) {
                  items.push({
                      Nombres: res.rows.item(i).Nombres,
                      Cedula: res.rows.item(i).Cedula,
                      Monto: res.rows.item(i).Monto,
                      ValorCuotas: res.rows.item(i).ValorCuotas,
                      FechaPago: res.rows.item(i).FechaPago,
                      EstadoCuota: res.rows.item(i).EstadoCuota
                  });
              }
          }
          this.allCuotas.next(items)
      }).catch((err)=>{
          console.log("errror al obtener todas las cuotas" + JSON.stringify(err))
      })
  }


  getAllCuotasPosteriores(fechaActual){
    let query2 = `SELECT 
    c.Id,
    c.Nombres,
    c.Cedula,
    p.Id,
    p.IdCliente,
    p.Monto,
    p.ValorCuotas,
    cu.IdPrestamo,
    cu.FechaPago,
    cu.EstadoCuota
    FROM cuota cu
    inner join prestamo p
    on p.Id = cu.IdPrestamo
    inner join cliente c
    on c.Id = p.IdCliente
    WHERE cu.FechaPago < '${fechaActual}' ORDER BY FechaPago LIMIT 20
    `

    return this.database.executeSql(query2 , []).then((res)=>{
      let items: any = [];
      if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
              items.push({
                  Nombres: res.rows.item(i).Nombres,
                  Cedula: res.rows.item(i).Cedula,
                  Monto: res.rows.item(i).Monto,
                  ValorCuotas: res.rows.item(i).ValorCuotas,
                  FechaPago: res.rows.item(i).FechaPago,
                  EstadoCuota: res.rows.item(i).EstadoCuota
              });
          }
      }
      this.allCuotasPosteriores.next(items)
  }).catch((err)=>{
      console.log("errror al obtener todas las cuotas posteriores" + JSON.stringify(err))
  })
  }

  getCuotasPosteriores(){
    return this.allCuotasPosteriores.asObservable();
  }

  
  getCuotas(){
    return this.allCuotas.asObservable();
   }


}
