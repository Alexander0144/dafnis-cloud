const Sequelize = require("sequelize");
const db = require("../../config/database");
const Cuenta = require("./Cuenta");

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

Cliente.hasMany(Cuenta, {
  foreignKey: { name: "cliente_id", allowNull: true },
});
Cuenta.belongsTo(Cliente, {
  foreignKey: { name: "cliente_id", allowNull: true },
});

module.exports = Cliente;
