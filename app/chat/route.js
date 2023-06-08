const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");

const {
    handlerSendChat,
    handlerGetChat,
  } = require("./handler");
const router = Express.Router();

router.post("/", authenticationToken, handlerSendChat);
router.get("/", authenticationToken, handlerGetChat);

module.exports = router;
