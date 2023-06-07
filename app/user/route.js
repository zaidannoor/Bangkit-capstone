const Express = require("express");
const {
    handlerGetUser,
  } = require("./handler");
const router = Express.Router();

router.get("/", handlerGetUser);

module.exports = router;
