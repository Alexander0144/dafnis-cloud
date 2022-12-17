const router = require("express").Router();
const sessionService = require("../services/sessionService");

router.post("/authenticate", (req, res) =>
  sessionService.validateUserCredentials(req, res)
);

router.post("/login", (req, res) =>
  sessionService.loginAndRegisterSession(req, res)
);

module.exports = router;
