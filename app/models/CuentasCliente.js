const db = require("../../config/database");

const CuentasCliente = db.define(
  "CuentasCliente",
  {},
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "cuentas_clientes",
  }
);

module.exports = CuentasCliente;
