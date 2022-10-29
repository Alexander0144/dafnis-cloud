const Sequelize = require("sequelize");
const Usuario = require("./Usuario");
const db = require("../../config/database");

const Rol = db.define("rol", {
  nombre: {
    type: Sequelize.STRING,
  },
  descripcion: {
    type: Sequelize.STRING,
  },
  estatus_activo: {
    type: Sequelize.BOOLEAN,
  },
  is_system_data: {
    type: Sequelize.BOOLEAN,
  },
});

Rol.hasMany(Usuario, { foreignKey: "rol_id" });
Usuario.belongsTo(Rol, { foreignKey: "rol_id" });

module.exports = Rol;
// Task.belongsTo(User, {foreignKey: "user_id"});
