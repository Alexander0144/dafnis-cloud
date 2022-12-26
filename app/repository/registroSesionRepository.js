const RegistroSesion = require("../models/RegistroSesion");

class RegistroSesionRepository {
  async createRegistroSesion(registroSesionParams) {
    const registroSesion = await RegistroSesion.create(registroSesionParams);
    return registroSesion;
  }

  async updateRegistroSesionById(id, dataUpdate) {
    const updatedResult = await RegistroSesion.update(dataUpdate, {
      where: {
        id: id
      }
    });

    return updatedResult;
  }

  async updateEstatusRegistroSesionByUsuarioId(usuarioId, estatusSesion) {
    const updatedResult = await RegistroSesion.update({
      estatus_sesion: estatusSesion
    }, {
      where: {
        usuario_id: usuarioId
      }
    });

    return updatedResult;
  }
}

const registroSesionRepository = new RegistroSesionRepository();
module.exports = registroSesionRepository;
