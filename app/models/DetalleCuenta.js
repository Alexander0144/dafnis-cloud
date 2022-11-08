const Sequelize = require("sequelize");
const db = require("../../config/database");

const DetalleCuenta = db.define(
  "DetalleCuenta",
  {
    cantidad_producto: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    importe: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    hora_de_pedido: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "detalles_cuentas",
  }
);

module.exports = DetalleCuenta;
/*cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: Cliente,
            key: "id",
        }
    }*/
