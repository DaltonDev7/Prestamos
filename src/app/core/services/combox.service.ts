import { Injectable } from '@angular/core';
import { Combox } from '../interfaces/combox';

@Injectable({
  providedIn: 'root'
})
export class ComboxService {

  constructor() { }

  sexoCombox: Combox[] = [
    { id: "HOMBRE", text: "HOMBRE" },
    { id: "MUJER", text: "MUJER" }
  ]

  bancosCombox: Combox[] = [
    {
      id: "BANRESERVAS", text: "BANRESERVAS"
    },
    {
      id: "BANCO POPULAR DOMINICANO", text: "BANCO POPULAR DOMINICANO"
    },
    {
      id: "BANCO BHD LEON", text: "BANCO BHD LEON"
    },
    {
      id: "SCOTIABANK", text: "SCOTIABANK"
    },
    {
      id: "CITIBANK", text: "CITIBANK"
    },
    {
      id: "BANCO MULTIPLE ACTIVO DOMINICANA", text: "BANCO MULTIPLE ACTIVO DOMINICANA"
    },
    {
      id: "BANCO SANTA CRUZ", text: "BANCO SANTA CRUZ"
    },
    {
      id: "BANCO CARIBE", text: "BANCO CARIBE"
    },
    {
      id: "BANCO ADEMI", text: "BANCO ADEMI"
    },
    {
      id: "BANCO DBI", text: "BANCO DBI"
    },
    {
      id: "BELLBANK", text: "BELLBANK"
    },
    {
      id: "BANESCO", text: "BANESCO"
    },
    {
      id: "BANCO LOPEZ DE HARO", text: "BANCO LOPEZ DE HARO"
    },
    {
      id: "BANCO LAFISE", text: "BANCO LAFISE"
    },
    {
      id: "BANCO PROMERICA", text: "BANCO PROMERICA"
    },
    {
      id: "BANCO VIMENCA", text: "BANCO VIMENCA"
    },
    {
      id: "BANCAMERICA", text: "BANCAMERICA"
    }
  ]

  EstadoCombox: Combox[] = [
    { id: "ACTIVO", text: "ACTIVO" },
    { id: "INACTIVO", text: "INACTIVO" }
  ]

  tipoPrestamo: any[] = [
    { id: 1, text: "DEFINIDO" },
    { id: 2, text: "INDEFINIDO" }
  ]

  frecuenciaPago: any[] = [
    { id: 30.5, text: "DIARIO" },
    { id: 4, text: "SEMANAL" },
    { id: 2, text: "QUINCENAL" },
    { id: 1, text: "MENSUAL" },
  ]

  estadoCuota: any[] = [
    { id: 1, text: "PAGADO" },
    { id: 2, text: "NO PAGADO" }
  ]


}
