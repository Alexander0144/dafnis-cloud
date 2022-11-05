const Sequelize = require("sequelize");
const db = require("../../config/database");

const Producto = db.define(
  "Producto",
  {
    clave_producto: {
      type: Sequelize.STRING,
    },
    nombre_producto: {
      type: Sequelize.STRING,
    },
    descripcion: {
      type: Sequelize.STRING,
    },
    estatus_activo: {
      type: Sequelize.BOOLEAN,
    },
    precio_unitario: {
      type: Sequelize.DOUBLE,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "productos",
  }
);

module.exports = Producto;
