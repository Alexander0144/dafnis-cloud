const Sequelize = require("sequelize");
const PermisoRol = require("./PermisoRol");
const db = require("../../config/database");

const Permiso = db.define(
  "Permiso",
  {
    nombre: {
      type: Sequelize.STRING,
    },
    permite_leer: {
      type: Sequelize.BOOLEAN,
    },
    permite_crear: {
      type: Sequelize.BOOLEAN,
    },
    permite_editar: {
      type: Sequelize.BOOLEAN,
    },
    permite_eliminar: {
      type: Sequelize.BOOLEAN,
    },
    modulo: {
      type: Sequelize.STRING,
    },
    ruta: {
      type: Sequelize.STRING,
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
    tableName: "permisos",
  }
);

Permiso.hasMany(PermisoRol, { foreignKey: "permiso_id" });
PermisoRol.belongsTo(Permiso, { foreignKey: "permiso_id" });

module.exports = Permiso;
