const Sequelize = require("sequelize");
const db = require("../../config/database");
const CuentasCliente = require("./CuentasCliente");

const Cliente = db.define(
  "Cliente",
  {
    nobre_completo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    alias: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    correo_electronico: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    },
    detalles_adicionales: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "clientes",
  }
);

Cliente.hasMany(CuentasCliente, { foreignKey: "cliente_id" });
CuentasCliente.belongsTo(Cliente, { foreignKey: "cliente_id" });

module.exports = Cliente;
