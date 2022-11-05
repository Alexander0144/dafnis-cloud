const db = require("./config/database");
const Rol = require("./app/models/Rol");
const Usuario = require("./app/models/Usuario");
const Permiso = require("./app/models/Permiso");
const PermisoRol = require("./app/models/PermisoRol");
const RegistroSesion = require("./app/models/RegistroSesion");
const Producto = require("./app/models/Producto");

async function sync() {
  try {
    await db.authenticate();
    console.log("Connected...");
    await Rol.sync();
    await Permiso.sync();
    await PermisoRol.sync();
    await Usuario.sync();
    await RegistroSesion.sync();
    await Producto.sync();
  } catch (error) {
    console.log(error.message);
  }
}

sync();
