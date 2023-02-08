const Cuenta = require("../models/Cuenta");

class CuentasCobrosRepository {
  async getAllCuentas() {
    const cuentasList = await Cuenta.findAll();
    return cuentasList;
  }

  async getCuentaById(cuentaId) {
    const cuentaById = await Cuenta.findByPk(cuentaId);
    return cuentaById;
  }

  async createNewCuenta(cuentaCreationParams) {
    const newCuenta = await Cuenta.create(cuentaCreationParams);
    return newCuenta;
  }
}

const cuentasCobrosRepository = new CuentasCobrosRepository();

module.exports = cuentasCobrosRepository;
