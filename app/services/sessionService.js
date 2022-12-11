const crypto = require("crypto");
const userRepository = require("../repository/userRepository");

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
}

const sessionService = new SessionService();

module.exports = sessionService;
