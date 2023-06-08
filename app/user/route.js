const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");

const {
    handlerGetUser,
    handlerGetDetailUser
  } = require("./handler");
const router = Express.Router();

router.get("/", authenticationToken, handlerGetUser);
router.get("/:id", authenticationToken, handlerGetDetailUser);

module.exports = router;
