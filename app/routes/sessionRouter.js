const router = require("express").Router();
const sessionService = require("../services/sessionService");

router.post("/authenticate", (req, res) =>
  sessionService.validateUserCredentials(req, res)
);

router.post("/login", (req, res) => {
  try {
    res.status(200).json({ status: "unimplemented" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
