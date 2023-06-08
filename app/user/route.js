const Express = require("express");
const {
    handlerGetUser,
    handlerGetDetailUser
  } = require("./handler");
const router = Express.Router();

router.get("/", handlerGetUser);
router.get("/:id", handlerGetDetailUser);

module.exports = router;
