require("process");
require("dotenv").config();

const env = {
  app: {
    port: parseInt(process.env.PORT) || 9001,
    view_engine: process.env.VIEW_ENGINE || "ejs",
    routes_protocol: process.env.PROTOCOL || "http",
    stage: process.env.APP_STAGE || "dev",
    api_root: process.env.API_ROOT || "/api",
    pages_root: process.env.PAGES_ROOT || "/",
    public_assets_root: process.env.PUBLIC_ASSETS_ROOT || "/public",
  },
  database: {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DIALECT || "mariadb",
    pool: {
      max: parseInt(process.env.POOL_MAX) || 5,
      min: parseInt(process.env.POOL_MIN) || 1,
      acquire: parseInt(process.env.POOL_ACQUIRE) || 30000,
      idle: parseInt(process.env.POOL_IDLE) || 10000,
    },
    name: process.env.DB_NAME || "dafnis",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    ssl_enable: process.env.DB_SSL_ENABLE || false,
    query_logging_enable: process.env.DB_LOGGING_ENABLE || false,
  },
  cookie: {
    name: process.env.COOKIE_NAME || "dafnis_sst",
    domain: process.env.COOKIE_DOMAIN || ".localhost:9001",
    http_only: process.env.COOKIE_HTTP_ONLY || true,
    is_secure: process.env.COOKIE_IS_SECURE || false,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    refresh_secret: process.env.REFRESH_TOKEN_SECRET,
    expires_ms: process.env.TOKEN_EXPIRES_MS,
  },
};

module.exports = env;
