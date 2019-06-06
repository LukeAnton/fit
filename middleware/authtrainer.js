const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //exporting middleware function
  const token = req.header("x-auth-token");

  //getting the token with req.header - sending in x-auth-token --this is just the name for it

  //if no token return this error
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  //if there is a token then this try is going to run decode jwt.verify on the token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    //then we set req.trainer to the trainer that is in the decoded token
    req.trainer = decoded.trainer;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
