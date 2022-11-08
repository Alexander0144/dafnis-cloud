const Sequelize = require("sequelize");
const db = require("../../config/database");
const DetalleCuenta = require("./DetalleCuenta");

const Producto = db.define(
  "Producto",
  {
    clave_producto: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombre_producto: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    estatus_activo: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    precio_unitario: {
      type: Sequelize.DOUBLE,
      allowNull: false,
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

Producto.hasMany(DetalleCuenta, { foreignKey: "producto_id" });
DetalleCuenta.belongsTo(Producto, { foreignKey: "producto_id" });

module.exports = Producto;
