const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  var token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send({
      message: "Please login to continue!",
    });
  } else {
    // invalid token - synchronous
    let jwt_secret = process.env.JWT_SECRET || "mysecret";

    try {
      var decoded = jwt.verify(token, jwt_secret);
      if (decoded) {
        req.user = decoded.data;
      } else {
        return res.status(401).send({
          message: "Please login to continue!",
        });
      }
    } catch (error) {
      // err
      if (error.expiredAt && error.expiredAt < new Date()) {
        return res.status(401).send({
          message: "Session expired!",
        });
      } else {
        return res.status(401).send({
          message: "Please login to continue!",
        });
      }
    }

    next();
  }
};
