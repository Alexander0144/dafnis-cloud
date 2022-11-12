const router = require("express").Router();

const MV = "MainLayout";

router.get("/", (req, res) => {
  res.redirect("/login");
});

router.get("/login", (req, res) => {
  res.render("Login");
});

// Temp
// TODO: Delete later

router.get("/main-layout", (req, res) => {
  const viewModel = {
    page: "partials/homeDashboardPartial",
  };
  res.render(MV, viewModel);
});

router.get("/test-products", (req, res) => {
  const viewModel = {
    page: "partials/productosPartial",
  };
  res.render(MV, viewModel);
});

module.exports = router;
