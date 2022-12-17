const rolRepository = require("../repository/rolRepository");

class RolService {
  async getMenuByRol(rolId) {
    const permisoRolData = await rolRepository.getRolWithPermisoById(rolId);
    let menuData = [];
    if (
      permisoRolData &&
      permisoRolData.PermisoRols &&
      permisoRolData.PermisoRols.length
    ) {
      menuData = this.mapPermisoRolDataToMenu(permisoRolData);
    }
    return menuData;
  }

  async mapPermisoRolDataToMenu(permisoRolData) {
    const menuData = permisoRolData.PermisoRols.map((permisoRol) => {
      return {
        modulo: permisoRol.Permiso.modulo,
        ruta: permisoRol.Permiso.ruta,
        permite_leer: permisoRol.Permiso.permite_leer,
        permite_crear: permisoRol.Permiso.permite_crear,
        permite_editar: permisoRol.Permiso.permite_editar,
        permite_eliminar: permisoRol.Permiso.permite_eliminar,
      };
    }).filter((item) => item.permite_leer === true);

    return menuData;
  }
}

const rolService = new RolService();

module.exports = rolService;
