const Sequelize = require("sequelize");
const db = require("../../config/database");
const Cliente = require("./Cliente");
const DetalleCuenta = require("./DetalleCuenta");

const Cuenta = db.define(
  "Cuenta",
  {
    numero_de_ticket: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    tipo_de_cuenta: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombre_cuenta: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tiene_cliente: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    sub_total: {
      type: Sequelize.DOUBLE,
      allowNull: false,
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

module.exports = Cuenta;
