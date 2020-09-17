import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasedatosService } from 'src/app/core/services/basedatos.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent implements OnInit {

  //atributos
  textoBuscar:string = '';
  listCliente:any[]= [];
  objpersonas:any[]= []

  constructor(
    public router : Router, 
    private activedRouter : ActivatedRoute,
    public baseDatosService: BasedatosService,) { }

  ngOnInit() {


    this.baseDatosService.getDataBaseState().subscribe((data) => {
      if (data) {
        this.baseDatosService.getClientes().subscribe((data) => {
          this.listCliente = data
          console.log(JSON.stringify(data))
        })
      }
    })


    this.objpersonas = [
      {
        Id:9,
        Nombres:'DALTON',
        Apellidos:'TEJADA CORTORREAL',
        Cedula:'402-12328823-3',
        FechaNacimiento:'CASD',
        Foto:'asd',
        Sexo:'HOMBRE',
        Direccion:'INVIVIENDA',
        Celular:'809-702-5016',
        Ocupacion:'ESTUDIANTE',
        Estado:'ACTIVO',
        Banco:'BAN RESERVAS',
        TarjetaNo:'0005015151',
        Clave:'ADASD',
        Cuenta:'ADAS',
        FechaCreacion:'Sep 05 2020'
      },
      {
        Id:9,
        Nombres:'ELISA',
        Apellidos:'TEJADA CORTORREAL',
        Cedula:'402-12328823-3',
        FechaNacimiento:'CASD',
        Foto:'asd',
        Sexo:'HOMBRE',
        Direccion:'INVIVIENDA',
        Celular:'809-702-5016',
        Ocupacion:'ESTUDIANTE',
        Estado:'ACTIVO',
        Banco:'BAN RESERVAS',
        TarjetaNo:'0005015151',
        Clave:'ADASD',
        Cuenta:'ADAS',
        FechaCreacion:'Sep 05 2020'
      },
      {
        Id:9,
        Nombres:'JUAN',
        Apellidos:'TEJADA CORTORREAL',
        Cedula:'402-12328823-3',
        FechaNacimiento:'CASD',
        Foto:'asd',
        Sexo:'HOMBRE',
        Direccion:'INVIVIENDA',
        Celular:'809-702-5016',
        Ocupacion:'ESTUDIANTE',
        Estado:'ACTIVO',
        Banco:'BAN RESERVAS',
        TarjetaNo:'0005015151',
        Clave:'ADASD',
        Cuenta:'ADAS',
        FechaCreacion:'Sep 05 2020'
      }
    ]


  }



  buscarCliente(event){
    this.textoBuscar = event.detail.value;
  }

}
