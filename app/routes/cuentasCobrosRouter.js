const router = require("express").Router();
const { authenticateTokenMiddleware } = require("../middleware/auth");
const cuentasCobrosService = require("../services/cuentasCobrosService");

router.get("/", authenticateTokenMiddleware(), (req, res) =>
  cuentasCobrosService.getAllCuentasCobros(req, res)
);

router.get("/:id", authenticateTokenMiddleware(), (req, res) =>
  cuentasCobrosService.getCuentasCobrosById(req, res)
);

router.post("/create", authenticateTokenMiddleware(), (req, res) =>
  cuentasCobrosService.createCuentaCobro(req, res)
);

router.post("/update/:id", authenticateTokenMiddleware(), (req, res) =>
  console.log(req, res)
);

module.exports = router;
