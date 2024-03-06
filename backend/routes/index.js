const authRoute = require("./auth.route");
const profileRoute = require("./profile.route");

module.exports = (app) => {
  app.use("/api/auth", authRoute);
  app.use("/api/profile", profileRoute);
};
