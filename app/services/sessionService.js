const crypto = require("crypto");
const userRepository = require("../repository/userRepository");
const rolRepository = require("../repository/rolRepository");
const registroSesionRepository = require("../repository/registroSesionRepository");
const {
  generateJwt,
  setSessionCookie,
  deleteSessionCookie,
} = require("../middleware/auth");
const { EstatusSesion } = require("../constants/constantsRegistroSesion");
const _ = require("lodash");

class SessionService {
  async validateUserCredentials(req, res) {
    try {
      const user = req.body.user;
      const password = req.body.password;

      if (!user || !password) {
        return res.status(400).json({
          status: "error",
          message: "El usuario o contraseña no fueron proporcionados",
        });
      }

      const dbUser = await userRepository.getUserByUserName(user);

      if (!dbUser) {
        return res
          .status(404)
          .json({ status: "error", message: "Usuario no encontrado" });
      }

      const externalHash = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");

      if (externalHash === dbUser.password) {
        return res.status(200).json({ status: "success", message: "OK" });
      } else {
        return res.status(400).json({
          status: "error",
          message: "Usuario o contraseña incorrectos",
        });
      }
    } catch (error) {
      console.log(
        "SessionService: An error occurred while validating user credentials"
      );
      console.error(error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async loginAndRegisterSession(req, res) {
    try {
      const user = req.body.user;
      const password = req.body.password;
      const fondosIniciales = parseInt(req.body.fondosIniciales);

      if (!user || !password) {
        return res.status(400).json({
          status: "error",
          message: "Se detecto un error en las credenciales al iniciar sesion",
        });
      }

      if (
        _.isNull(fondosIniciales) ||
        _.isUndefined(fondosIniciales) ||
        _.isNaN(fondosIniciales) ||
        !_.isNumber(fondosIniciales) ||
        fondosIniciales <= 0
      ) {
        return res.status(400).json({
          status: "error",
          message:
            "El valor proporcionado para los fondos iniciales no es valido",
        });
      }

      const dbUser = await userRepository.getUserByUserName(user);

      if (!dbUser) {
        return res
          .status(404)
          .json({ status: "error", message: "Usuario no encontrado" });
      }

      const externalHash = crypto
        .createHash("md5")
        .update(password)
        .digest("hex");

      if (externalHash !== dbUser.password) {
        return res.status(400).json({
          status: "error",
          message: "Usuario o contraseña incorrectos",
        });
      }

      const userRole = await rolRepository.getRolById(dbUser.rol_id);

      const sessionUser = {
        id: dbUser.id,
        username: dbUser.username,
        correo: dbUser.correo,
        nombre_completo: dbUser.nombre_completo,
        estatus_activo: dbUser.estatus_activo,
        rol: {
          id: userRole.id,
          nombre: userRole.nombre,
        },
      };

      const newRegistroSesionParams = {
        estatus_sesion: EstatusSesion.ACTIVA,
        fondo_inicial_caja: fondosIniciales,
        hora_de_apertura: new Date(Date.now()),
        fondos_despues_del_corte: null,
        hora_de_cierre: null,
        usuario_id: dbUser.id,
      };

      await registroSesionRepository.createRegistroSesion(
        newRegistroSesionParams
      );

      // Create Token
      const jwtToken = generateJwt(sessionUser);

      // Save token in cookie
      setSessionCookie(res, jwtToken);

      return res
        .status(200)
        .json({ status: "success", redirect: true, location: "/home" });
    } catch (error) {
      console.log("SessionService: An error occurred in the login process");
      console.error(error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  }

  async logoutAndUpdateSessionstatus(req, res) {
    try {
      if (!req.session || !req.session.user) {
        throw new Error("Invalid session data or JWT");
      }

      const user = req.session.user;

      await registroSesionRepository.updateEstatusRegistroSesionByUsuarioId(
        user.id,
        EstatusSesion.INACTIVA
      );

      deleteSessionCookie(res);

      delete req.session;

      return res
        .status(200)
        .json({ status: "success", redirect: true, location: "/login" });
    } catch (error) {
      console.log("SessionService: An error occurred while logging out");
      console.error(error.message);
      res.status(500).json({ status: "error", message: error.message });
    }
  }
}

const sessionService = new SessionService();

module.exports = sessionService;
