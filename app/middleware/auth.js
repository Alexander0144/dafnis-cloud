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

module.exports.deleteSessionCookie = function(res) {
  res.clearCookie(env.cookie.name);
}

async function verifyAndDecodeToken(token) {
  return new Promise(function(resolve, reject) {
    if (!token) {
      return reject("Token cannot be empty");
    }
    jwt.verify(token, env.jwt.secret, function(err, decoded) {
      if (err) {
        return reject(err);
      }
      return resolve(decoded);
    })
  });
}

module.exports.verifyAndDecodeToken = verifyAndDecodeToken;

module.exports.authenticateTokenMiddleware = function() {
  return async function(req, res, next) {
    const sessionToken = req.cookies[env.cookie.name];
    if (!sessionToken) {
      return res.status(401).json({status: "error", message: "Unauthorized", code: 401});
    }

    try {
      const userSessionData = await verifyAndDecodeToken(sessionToken);
      req.session = {
        user: userSessionData,
        token: sessionToken
      };
      next();
    } catch (error) {
      console.error("An error occurred while decoding JWT");
      console.error(error.message);
      return res.status(500).json({status: "error", message: "Internal server error", code: 500});
    }
  }
}
