const Sequelize = require("sequelize");
const env = require("./env");

const connectionConfig = {
  host: env.database.host,
  dialect: env.database.dialect,
  operatorAliases: false,
  pool: {
    max: env.database.pool.max,
    min: env.database.pool.min,
    acquire: env.database.pool.acquire,
    idle: env.database.pool.idle,
  },
  /*ssl: env.database.ssl_enable,
  dialectOptions: {
    ssl: {
      require: env.database.ssl_enable,
    },
  },*/
};

const db = new Sequelize(
  env.database.name,
  env.database.user,
  env.database.password,
  connectionConfig
);

module.exports = db;
