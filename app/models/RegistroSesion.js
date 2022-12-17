const Sequelize = require("sequelize");
const db = require("../../config/database");

const RegistroSesion = db.define(
  "RegistroSesion",
  {
    estatus_sesion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fondo_inicial_caja: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    hora_de_apertura: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    fondos_despues_del_corte: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    hora_de_cierre: {
      type: Sequelize.DATE,
      allowNull: true,
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
