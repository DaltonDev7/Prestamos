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
    Cuenta TEXT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS index_cedula ON cliente(Cedula);

CREATE TABLE IF NOT EXISTS prestamo(
     Id INTEGER PRIMARY KEY AUTOINCREMENT,
     IdCliente INTEGER,
     Tipo TEXT NULL,
     Fecha DATETIME NULL,
     Hora TIME NULL,
     Monto DECIMAL NULL,
     CantidadCuotas INTEGER NULL,
     ValorCuotas DECIMAL NULL,
     TotalPago DECIMAL NULL,
     InteresGenerar DECIMAL NULL,
     FOREIGN KEY(IdCliente) REFERENCES cliente(Id)
);

CREATE TABLE IF NOT EXISTS cuota(
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    IdPrestamo INTEGER,
    CapitalInicial DECIMAL NULL,
    Interes DECIMAL NULL,
    Pago DECIMAL NULL,
    Capital DECIMAL NULL,
    CapitalFinal DECIMAL NULL,
    FOREIGN KEY(IdPrestamo) REFERENCES prestamo(Id)
);



