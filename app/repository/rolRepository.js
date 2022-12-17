const Rol = require("../models/Rol");
const PermisoRol = require("../models/PermisoRol");
const Permiso = require("../models/Permiso");

class RolRepository {
  async getRolById(rolId) {
    const rol = await Rol.findByPk(rolId);
    return rol;
  }

  async getRolWithPermisoById(rolId) {
    const rolConPermisos = await Rol.findByPk(rolId, {
      include: [
        {
          model: PermisoRol,
          required: false,
          include: [
            {
              model: Permiso,
              required: false,
            },
          ],
        },
      ],
    });

    return rolConPermisos;
  }
}

const rolRepository = new RolRepository();

module.exports = rolRepository;
