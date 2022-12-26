const router = require("express").Router();
const sessionService = require("../services/sessionService");
const { authenticateTokenMiddleware } = require("../middleware/auth");

router.post("/authenticate", (req, res) =>
  sessionService.validateUserCredentials(req, res)
);

router.post("/login", (req, res) =>
  sessionService.loginAndRegisterSession(req, res)
);

router.post("/logout", authenticateTokenMiddleware(), (req, res) =>
  sessionService.logoutAndUpdateSessionstatus(req, res)
);

module.exports = router;
