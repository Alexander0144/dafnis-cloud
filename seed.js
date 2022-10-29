const db = require("./config/database");
const Rol = require("./app/models/Rol");
const Usuario = require("./app/models/Usuario");
const Permiso = require("./app/models/Permiso");
const PermisoRol = require("./app/models/PermisoRol");
const RegistroSesion = require("./app/models/RegistroSesion");

async function sync() {
  try {
    await db.authenticate();
    console.log("Connected...");
    await Rol.sync();
    await RegistroSesion.sync();
    await Usuario.sync();
    await Permiso.sync();
    await PermisoRol.sync();
  } catch (error) {
    console.log(error.message);
  }
}

sync();
