const router = require("express").Router();
const sessionRouter = require("./routes/sessionRouter");
const productosRouter = require("./routes/productosRouter");

router.use("/session", sessionRouter);
router.use("/productos", productosRouter);

module.exports = router;
