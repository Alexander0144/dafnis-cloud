const db = require("./config/database");
const Rol = require("./app/models/Rol");
const Usuario = require("./app/models/Usuario");

async function sync() {
  try {
    await db.authenticate();
    console.log("Connected...");
    await Rol.sync();
    await Usuario.sync();
  } catch (error) {
    console.log(error.message);
  }
}

sync();
