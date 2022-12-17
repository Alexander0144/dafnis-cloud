const jwt = require("jsonwebtoken");
const env = require("../../config/env");

module.exports.generateJwt = function (sessionData) {
  const accessToken = jwt.sign(sessionData, env.jwt.secret);
  return accessToken;
};

module.exports.setSessionCookie = function (res, token) {
  const cookieOptions = {
    httpOnly: env.cookie.http_only,
    maxAge: env.jwt.expires_ms,
  };

  res.cookie(env.cookie.name, token, cookieOptions);
};
