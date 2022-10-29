const Sequelize = require("sequelize");
const db = require("../../config/database");

const RegistroSesion = db.define(
  "RegistroSesion",
  {
    estatus_sesion: {
      type: Sequelize.STRING,
    },
    fondo_inicial_caja: {
      type: Sequelize.INTEGER,
    },
    hora_de_apertura: {
      type: Sequelize.DATE,
    },
    fondos_despues_del_corte: {
      type: Sequelize.INTEGER,
    },
    hora_de_cierre: {
      type: Sequelize.DATE,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "registro_sesiones",
  }
);

module.exports = RegistroSesion;
