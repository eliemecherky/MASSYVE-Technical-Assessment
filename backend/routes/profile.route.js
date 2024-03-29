const router = require("express").Router();
const profileController = require("./../controllers/profile.controller");
const middleware = require("./../helpers/middleware");

router.get("/current-user", middleware.auth, profileController.current_user);

module.exports = router;
