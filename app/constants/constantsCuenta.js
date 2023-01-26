const TipoCompraCuenta = Object.freeze({
  CONSUMO_EN_RESTAURANTE: "consumo en restaurante",
  RECOGER_ENCARGO_MOSTRADOR: "recoger en mostrador",
  PARA_LLEVAR: "para llevar",
  SERVICIO_DOMICILIO: "servicio a domicilio",
});

const EstatusCuenta = Object.freeze({
  ABIERTA: "abierta",
  PAGADA: "pagada",
  CANCELADA: "cancelada",
});

const TiposDePago = Object.freeze({
  EFECTIVO: "efectivo",
  TARJETA_CREDITO: "tarjeta de credito",
  TARJETA_DEBITO: "tarjeta de debito",
  CORTESIA: "cortesia",
});

module.exports = { TipoCompraCuenta, EstatusCuenta, TiposDePago };
