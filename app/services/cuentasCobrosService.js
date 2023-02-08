const _ = require("lodash");
const uuid4 = require("uuid4");
const TiposDePago = require("../constants/constantsCuenta").TiposDePago;
const EstatusCuenta = require("../constants/constantsCuenta").EstatusCuenta;
const cuentasCobrosRepository = require("../repository/cuentasCobrosRepository");

class CuentasCobrosService {
  async getAllCuentasCobros(req, res) {
    try {
      if (!req.session || !req.session.user || !req.session.user.id) {
        return res.status(401).json({
          status: "error",
          error: "Unauthorized",
          message: "Petición no autorizada",
          code: 401,
        });
      }

      const cuentas = await cuentasCobrosRepository.getAllCuentas();

      return res.status(200).json({
        status: "success",
        message: "success",
        code: 200,
        data: cuentas,
      });
    } catch (error) {
      console.log(
        "CuentasCobrosService: Ocurrio un error al consultar la lista de cuentas/cobros"
      );
      console.error(error.message);
      return res.status(500).json({
        status: "error",
        error: "Internal server error",
        message: error.message,
        code: 500,
      });
    }
  }

  async getCuentasCobrosById(req, res) {
    try {
      if (!req.session || !req.session.user || !req.session.user.id) {
        return res.status(401).json({
          status: "error",
          error: "Unauthorized",
          message: "Petición no autorizada",
          code: 401,
        });
      }

      const idParam = req.params.id;

      if (!idParam) {
        return res.status(400).json({
          status: "error",
          error: "Bad Request",
          message: "No se proporcionó un Id valido",
          code: 400,
        });
      }

      const cuentaId = parseInt(idParam);

      const cuentaDb = await cuentasCobrosRepository.getCuentaById(cuentaId);

      if (!cuentaDb) {
        return res.status(404).json({
          status: "error",
          error: "Not Found",
          message: "No se encontro el la cuenta con el Id especificado",
          code: 404,
        });
      }

      return res.status(200).json({
        status: "success",
        message: "Cuenta encontrada",
        data: cuentaDb,
        code: 200,
      });
    } catch (error) {
      console.log(
        "CuentasCobrosService: Ocurrio un error al tratar de encontrar una cuenta por Id"
      );
      console.error(error.message);
      return res.status(500).json({
        status: "error",
        error: "Internal server error",
        message: error.message,
        code: 500,
      });
    }
  }

  async createCuentaCobro(req, res) {
    try {
      if (!req.session || !req.session.user || !req.session.user.id) {
        return res.status(401).json({
          status: "error",
          error: "Unauthorized",
          message: "Petición no autorizada",
          code: 401,
        });
      }

      const body = req.body;

      const { nombre_cuenta, tipo_de_cuenta } = body;

      if (_.isEmpty(nombre_cuenta)) {
        return res.status(400).json({
          status: "error",
          error: "Bad request",
          message: "Proporcione un nombre valido para la cuenta",
          code: 400,
        });
      }

      if (_.isEmpty(tipo_de_cuenta)) {
        return res.status(400).json({
          status: "error",
          error: "Bad request",
          message: "Seleccione el tipo de cuenta",
          code: 400,
        });
      }

      const newFolioTicket = uuid4();

      const newCobroCuentaCreationParams = {
        folio_de_ticket: newFolioTicket,
        tipo_de_cuenta: tipo_de_cuenta,
        estatus_de_cuenta: EstatusCuenta.ABIERTA,
        nombre_cuenta: nombre_cuenta,
      };

      const newCuenta = await cuentasCobrosRepository.createNewCuenta(
        newCobroCuentaCreationParams
      );

      const responseMessage = "Nueva cuenta creada con Id: " + newCuenta.id;

      return res.status(201).json({
        status: "success",
        message: responseMessage,
        data: newCuenta,
        code: 201,
      });
    } catch (error) {
      console.log(
        "CuentasCobrosService: Ocurrio un error al tratar de encontrar una cuenta por Id"
      );
      console.error(error.message);
      return res.status(500).json({
        status: "error",
        error: "Internal server error",
        message: error.message,
        code: 500,
      });
    }
  }
}

const cuentasCobrosService = new CuentasCobrosService();

module.exports = cuentasCobrosService;
