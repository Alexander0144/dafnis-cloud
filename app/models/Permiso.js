const Sequelize = require("sequelize");
const PermisoRol = require("./PermisoRol");
const db = require("../../config/database");

const Permiso = db.define(
  "Permiso",
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    permite_leer: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    permite_crear: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    permite_editar: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    permite_eliminar: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    modulo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ruta: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    icono: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    is_system_data: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
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
