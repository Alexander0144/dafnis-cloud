const RegistroSesion = require("../models/RegistroSesion");

class RegistroSesionRepository {
  async createRegistroSesion(registroSesionParams) {
    const registroSesion = await RegistroSesion.create(registroSesionParams);
    return registroSesion;
  }
}

const registroSesionRepository = new RegistroSesionRepository();
module.exports = registroSesionRepository;
