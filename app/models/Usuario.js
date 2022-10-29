const Sequelize = require("sequelize");
const db = require("../../config/database");
const RegistroSesion = require("./RegistroSesion");

const Usuario = db.define(
  "Usuario",
  {
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
  },
  {
    timestamps: true,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: "usuarios",
  }
);

Usuario.hasMany(RegistroSesion, { foreignKey: "usuario_id" });
RegistroSesion.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = Usuario;
