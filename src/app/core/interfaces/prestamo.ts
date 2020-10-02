
export interface Prestamo{
    Id?:number; 
    IdCliente?:number;
    FrecuenciaPago:number;
    MontoInteres:number;
    PagoCapital:number;
    PagoInteres:number;
    Tipo?:number;
    Fecha?:string;
    Hora?:string; 
    Monto?:number; 
    CantidadCuotas?:number;
    ValorCuotas?:number;
    TotalPago?:number;
    InteresGenerar?:number;
    EstadoPrestamo?:string;
    FechaCreacionPrestamo?:string;
}