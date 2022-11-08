const Sequelize = require("sequelize");
const db = require("../../config/database");
const RegistroSesion = require("./RegistroSesion");
const Producto = require("./Producto");

const Usuario = db.define(
  "Usuario",
  {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellido_paterno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellido_materno: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombre_completo: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    correo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estatus_activo: {
      type: Sequelize.BOOLEAN,
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
    tableName: "usuarios",
  }
);

Usuario.hasMany(RegistroSesion, { foreignKey: "usuario_id" });
RegistroSesion.belongsTo(Usuario, { foreignKey: "usuario_id" });

Usuario.hasMany(Producto, { foreignKey: "creado_por_id" });
Producto.belongsTo(Usuario, { foreignKey: "creado_por_id" });
Usuario.hasMany(Producto, { foreignKey: "editado_por_id" });
Producto.belongsTo(Usuario, { foreignKey: "editado_por_id" });

module.exports = Usuario;
