const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");

const {
    handlerGetUser,
    handlerGetDetailUser,
    handlerChangeProfileUser
  } = require("./handler");
const router = Express.Router();

router.get("/", authenticationToken, handlerGetUser);
router.get("/detail", authenticationToken, handlerGetDetailUser);
router.put("/edit", authenticationToken, handlerChangeProfileUser);

module.exports = router;
