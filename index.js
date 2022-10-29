const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const env = require("./config/env");

console.log(require("util").inspect(env));

const db = require("./config/database");

app.disable("x-powered-by");

app.set("views", path.join(__dirname, "app/views"));
app.set("view engine", env.app.view_engine);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.authenticate()
  .then(() => {
    console.log("Connection established...");
  })
  .catch((err) => console.log(err));

app.listen(env.app.port, () => {
  console.log(`Servidor de aplicación corriendo en el puerto ${env.app.port}`);
});
