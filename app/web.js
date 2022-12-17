const router = require("express").Router();

const MV = "MainLayout";

router.get("/", (req, res) => {
  if (req.cookies["dafnis_jwt"]) {
    return res.redirect("/home");
  } else {
    return res.redirect("/login");
  }
});

router.get("/login", (req, res) => {
  res.render("Login");
});

router.get("/home", (req, res) => {
  const viewModel = {
    page: "partials/homeDashboardPartial",
  };
  res.render(MV, viewModel);
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
