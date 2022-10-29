const Sequelize = require("sequelize");
const db = require("../../config/database");
const Rol = require("./Rol");

const Usuario = db.define("usuario", {
  nombre: {
    type: Sequelize.STRING,
  },
  apellido_paterno: {
    type: Sequelize.STRING,
  },
  apellido_materno: {
    type: Sequelize.STRING,
  },
  nombre_completo: {
    type: Sequelize.STRING,
  },
  correo: {
    type: Sequelize.STRING,
  },
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  estatus_activo: {
    type: Sequelize.BOOLEAN,
  },
  is_system_data: {
    type: Sequelize.BOOLEAN,
  },
});

module.exports = Usuario;
