const db = require("./config/database");
const Rol = require("./app/models/Rol");
const Usuario = require("./app/models/Usuario");
const Permiso = require("./app/models/Permiso");
const PermisoRol = require("./app/models/PermisoRol");
const RegistroSesion = require("./app/models/RegistroSesion");
const Producto = require("./app/models/Producto");
const Cliente = require("./app/models/Cliente");
const Cuenta = require("./app/models/Cuenta");
const DetalleCuenta = require("./app/models/DetalleCuenta");
const CuentasCliente = require("./app/models/CuentasCliente");
const crypto = require("crypto");

async function createTables() {
  try {
    await Rol.sync();
    await Permiso.sync();
    await PermisoRol.sync();
    await Usuario.sync();
    await RegistroSesion.sync();
    await Cliente.sync();
    await Producto.sync();
    await Cuenta.sync();
    await DetalleCuenta.sync();
    await CuentasCliente.sync();
  } catch (error) {
    console.log("Error creating tables");
    console.error(error.message);
    throw error;
  }
}

async function insertSystemData() {
  try {
    const countPermisos = await Permiso.count();

    const permisosAdmin = [];
    if (!countPermisos) {
      const permisoAdminDashboard = await Permiso.create({
        nombre: "admin dashboard",
        permite_leer: true,
        permite_crear: true,
        permite_editar: true,
        permite_eliminar: true,
        modulo: "Dashboard",
        ruta: "/home",
        icono: "ti-home",
        is_system_data: true,
      });

      permisosAdmin.push(permisoAdminDashboard);

      const permisoAdminCuentas = await Permiso.create({
        nombre: "admin cuentas cobros",
        permite_leer: true,
        permite_crear: true,
        permite_editar: true,
        permite_eliminar: true,
        modulo: "Cuentas/Cobros",
        ruta: "/cuentas",
        icono: "ti-shopping-cart",
        is_system_data: true,
      });

      permisosAdmin.push(permisoAdminCuentas);

      const permisoAdminProductos = await Permiso.create({
        nombre: "admin productos",
        permite_leer: true,
        permite_crear: true,
        permite_editar: true,
        permite_eliminar: true,
        modulo: "Productos",
        ruta: "/productos",
        icono: "ti-star",
        is_system_data: true,
      });

      permisosAdmin.push(permisoAdminProductos);

      const permisoAdminClientes = await Permiso.create({
        nombre: "admin clientes",
        permite_leer: true,
        permite_crear: true,
        permite_editar: true,
        permite_eliminar: true,
        modulo: "Clientes",
        ruta: "/clientes",
        icono: "ti-notepad",
        is_system_data: true,
      });

      permisosAdmin.push(permisoAdminClientes);
    }

    const countRol = await Rol.count();

    let rolAdmin = null;
    if (!countRol) {
      rolAdmin = await Rol.create({
        nombre: "Administrador",
        descripcion: "Administrador del sistema",
        estatus_activo: true,
        is_system_data: true,
      });
    }

    if (rolAdmin && permisosAdmin.length) {
      for (const permiso of permisosAdmin) {
        await PermisoRol.create({
          rol_id: rolAdmin.id,
          permiso_id: permiso.id,
          is_system_data: true,
        });
      }
    }

    const countUsuario = await Usuario.count();

    if (!countUsuario) {
      const password = "12345678";
      const hash = crypto.createHash("md5").update(password).digest("hex");
      await Usuario.create({
        nombre: "Admin",
        apellido_paterno: "Sys",
        apellido_materno: "Admin",
        nombre_completo: "Admin Sys Admin",
        correo: "system@admin.com",
        username: "admin",
        password: hash,
        estatus_activo: true,
        is_system_data: true,
        rol_id: rolAdmin.id,
      });
    }
  } catch (error) {
    console.log("Error inserting system data");
    console.error(error.message);
    throw error;
  }
}

async function sync() {
  try {
    await db.authenticate();
    console.log("Connected...");

    await createTables();
    await insertSystemData();

    process.exit(0);
  } catch (error) {
    console.log(error.message);
  }
}

sync();
