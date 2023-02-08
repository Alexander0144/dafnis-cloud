const Sequelize = require("sequelize");
const db = require("../../config/database");
const CuentasCliente = require("./CuentasCliente");
const DetalleCuenta = require("./DetalleCuenta");
const { EstatusCuenta } = require("../constants/constantsCuenta");

const Cuenta = db.define(
  "Cuenta",
  {
    folio_de_ticket: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    tipo_de_cuenta: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipo_de_pago: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    estatus_de_cuenta: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: EstatusCuenta.ABIERTA,
    },
    nombre_cuenta: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tiene_cliente: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sub_total: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    iva: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    importe: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
    cambio: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "cuentas",
  }
);

Cuenta.hasMany(DetalleCuenta, { foreignKey: "cuenta_id" });
DetalleCuenta.belongsTo(Cuenta, { foreignKey: "cuenta_id" });

Cuenta.hasMany(CuentasCliente, { foreignKey: "cuenta_id" });
CuentasCliente.belongsTo(Cuenta, { foreignKey: "cuenta_id" });

module.exports = Cuenta;
