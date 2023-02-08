const router = require("express").Router();
const { authenticateTokenMiddleware } = require("./middleware/auth");
const { getSidebarMenuMiddleware } = require("./middleware/menu");
const env = require("../config/env");

const MV = "MainLayout";

router.get("/", (req, res) => {
  if (req.cookies[env.cookie.name]) {
    return res.redirect("/home");
  } else {
    return res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  res.render("Login");
});

// Only access if logged in with valid token

router.get(
  "/home",
  authenticateTokenMiddleware(),
  getSidebarMenuMiddleware(),
  (req, res) => {
    const viewModel = {
      page: "partials/homeDashboardPartial",
      partialScripts: "partials_scripts/placeholder",
      partialStyles: "partials_styles/placeholder",
      menu: req.session.menu,
      user: req.session.user,
    };
    res.render(MV, viewModel);
  }
);

router.get(
  "/productos",
  authenticateTokenMiddleware(),
  getSidebarMenuMiddleware(),
  (req, res) => {
    const viewModel = {
      page: "partials/productosPartial",
      partialScripts: "partials_scripts/productosScripts",
      partialStyles: "partials_styles/productosStyles",
      menu: req.session.menu,
      user: req.session.user,
    };
    res.render(MV, viewModel);
  }
);

router.get(
  "/cuentas",
  authenticateTokenMiddleware(),
  getSidebarMenuMiddleware(),
  (req, res) => {
    const viewModel = {
      page: "partials/cuentasPartial",
      partialScripts: "partials_scripts/cuentasScripts",
      partialStyles: "partials_styles/cuentasStyles",
      menu: req.session.menu,
      user: req.session.user,
    };
    res.render(MV, viewModel);
  }
);

router.get(
  "/clientes",
  authenticateTokenMiddleware(),
  getSidebarMenuMiddleware(),
  (req, res) => {
    const viewModel = {
      page: "partials/clientesPartial",
      partialScripts: "partials_scripts/placeholder",
      partialStyles: "partials_styles/placeholder",
      menu: req.session.menu,
      user: req.session.user,
    };
    res.render(MV, viewModel);
  }
);

router.get(
  "/cuentas/detalle",
  authenticateTokenMiddleware(),
  getSidebarMenuMiddleware(),
  (req, res) => {
    const viewModel = {
      page: "partials/detallesCuentaPartial",
      partialScripts: "partials_scripts/detallesCuenta",
      partialStyles: "partials_styles/detallesCuenta",
      menu: req.session.menu,
      user: req.session.user,
    };
    res.render(MV, viewModel);
  }
);

module.exports = router;
