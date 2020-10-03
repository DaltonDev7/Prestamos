CREATE TABLE IF NOT EXISTS cliente(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Cedula TEXT NULL,
    Foto TEXT NULL,
    Nombres TEXT NULL,
    Apellidos TEXT NULL,
    Sexo TEXT NULL,
    FechaNacimiento DATETIME NULL,
    Direccion TEXT NULL,
    Ocupacion TEXT NULL,
    Celular TEXT NULL,
    Estado TEXT NULL,
    Banco TEXT NULL,
    TarjetaNo TEXT NULL,
    Clave TEXT NULL,
    Cuenta TEXT NULL,
    FechaCreacion DATETIME
);

CREATE UNIQUE INDEX IF NOT EXISTS index_cedula ON cliente(Cedula);

--ALTER TABLE cliente ADD COLUMN FechaCreacion DATETIME;



CREATE TABLE IF NOT EXISTS prestamo(
     Id INTEGER PRIMARY KEY AUTOINCREMENT,
     IdCliente INTEGER,
     Tipo INTEGER NULL,
     Monto DECIMAL NULL,
     FrecuenciaPago INTEGER NULL,
     InteresGenerar DECIMAL NULL,
     CantidadCuotas INTEGER NULL,
     ValorCuotas DECIMAL NULL,
     MontoInteres DECIMAL NULL,
     TotalPago DECIMAL NULL,
     PagoCapital DECIMAL NULL,
     PagoInteres DECIMAL NULL,
     EstadoPrestamo TEXT NULL,
     FechaCreacionPrestamo DATETIME,
     FOREIGN KEY(IdCliente) REFERENCES cliente(Id)
);

--ALTER TABLE prestamo ADD COLUMN FechaCreacion DATETIME;
-- ALTER TABLE prestamo ADD COLUMN EstadoPrestamo TEXT NULL;
-- ALTER TABLE prestamo ADD COLUMN FechaCreacion DATETIME;


CREATE TABLE IF NOT EXISTS cuota(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    IdPrestamo INTEGER,
    CapitalInicial DECIMAL NULL,
    Interes DECIMAL NULL,
    Pago DECIMAL NULL,
    Capital DECIMAL NULL,
    CapitalFinal DECIMAL NULL,
    FechaCreacionCuota DATETIME,
    FOREIGN KEY(IdPrestamo) REFERENCES prestamo(Id)
);

--ALTER TABLE cuota ADD COLUMN FechaCreacion DATETIME;



