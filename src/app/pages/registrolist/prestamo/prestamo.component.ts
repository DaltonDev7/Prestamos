import { Component, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { BasedatosService } from 'src/app/core/services/basedatos.service';
import { PrestamoService } from 'src/app/core/services/prestamo.service';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss'],
})
export class PrestamoComponent implements OnInit {

  //atributos
  listPrestamo:any[] = [];
  textoBuscar:string = '';
  prestamosCount:number = 0;
  data;
  constructor(
    public prestamoService: PrestamoService,
    public baseDatosService: BasedatosService
  ) { }

  ngOnInit() {

    this.prestamoService.loadPrestamo();
    
    this.baseDatosService.getDataBaseState().subscribe((data) => {
      if (data) {
        this.prestamoService.getPrestamos().subscribe((prestamos)=>{
          console.log("prestamos" + JSON.stringify(prestamos))
          this.listPrestamo = prestamos
          this.prestamosCount = this.listPrestamo.length
        })
      }
    })

    this.data = [
      {
        Id: 5000,
        IdCliente: 5000,
        Tipo: 5000,
        Fecha: '2005 05 09',
        Hora: '2005 05 09' ,
        Monto: 5000,
        CantidadCuotas: 5000,
        ValorCuotas: 5000,
        TotalPago: 5000,
        InteresGenerar: 5000,
        FechaCreacion: '2005 05 09'
      }
    ]

  }

  buscarPrestamo(event){
    this.textoBuscar = event.detail.value;
  }

}
