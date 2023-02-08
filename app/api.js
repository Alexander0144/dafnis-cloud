const router = require("express").Router();
const sessionRouter = require("./routes/sessionRouter");
const productosRouter = require("./routes/productosRouter");
const cuentasCobrosRouter = require("./routes/cuentasCobrosRouter");

router.use("/session", sessionRouter);
router.use("/productos", productosRouter);
router.use("/cuentas-cobros", cuentasCobrosRouter);

module.exports = router;
