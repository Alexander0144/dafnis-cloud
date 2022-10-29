const Sequelize = require("sequelize");
const db = require("../../config/database");

const PermisoRol = db.define(
  "PermisoRol",
  {
    is_system_data: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "permiso_roles",
  }
);

module.exports = PermisoRol;
