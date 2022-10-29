const Sequelize = require("sequelize");
const Usuario = require("./Usuario");
const PermisoRol = require("./PermisoRol");
const db = require("../../config/database");

const Rol = db.define(
  "Rol",
  {
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
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "roles",
  }
);

Rol.hasMany(Usuario, { foreignKey: "rol_id" });
Usuario.belongsTo(Rol, { foreignKey: "rol_id" });

Rol.hasMany(PermisoRol, { foreignKey: "rol_id" });
PermisoRol.belongsTo(Rol, { foreignKey: "rol_id" });

module.exports = Rol;
// Task.belongsTo(User, {foreignKey: "user_id"});
