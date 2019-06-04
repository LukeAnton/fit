const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //when we send a token from a protected route we need to send it in the header
  const token = req.header("x-auth-token");
};
