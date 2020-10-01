export interface Cuota {
    Id?:number;
    IdPrestamo?:number;
    CapitalInicial?:number; //monto que se presto
    Interes?:number;
    Pago?:number; //valor de la cuota
    Capital?:number;
    CapitalFinal?:number;
    FechaCreacionCuota?:Date;
}