const router = require("express").Router();
const productosService = require("../services/productosService");
const { authenticateTokenMiddleware } = require("../middleware/auth");

router.get("/", authenticateTokenMiddleware(), (req, res) =>
  productosService.getAllProductos(req, res)
);

router.get("/:id", authenticateTokenMiddleware(), (req, res) =>
  productosService.getProductoById(req, res)
);

router.post("/create", authenticateTokenMiddleware(), (req, res) =>
  productosService.createProducto(req, res)
);

router.post("/update/:id", authenticateTokenMiddleware(), (req, res) =>
  productosService.handleUpdateProducto(req, res)
);

router.post("/delete/:id", authenticateTokenMiddleware(), (req, res) =>
  productosService.handleDeleteProducto(req, res)
);

module.exports = router;
