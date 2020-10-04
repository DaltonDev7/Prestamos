export interface Cuota {
    Id?:number;
    IdPrestamo?:number;
    FechaPago?:Date;
    CapitalInicial?:number; 
    Valor?:number; 
    PagoCapital?:number; 
    PagoInteres?:number; 
    CapitalFinal?:number;
    FechaCreacionCuota?:Date;
}