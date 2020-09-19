
export interface Prestamo{
    Id?:number; 
    IdCliente?:number;
    Tipo?:number;
    Fecha?:string;
    Hora?:string; 
    Monto?:number; 
    CantidadCuotas?:number;
    ValorCuotas?:number;
    TotalPago?:number;
    InteresGenerar?:number;
    EstadoPrestamo?:string;
    FechaCreacion?:string;
}