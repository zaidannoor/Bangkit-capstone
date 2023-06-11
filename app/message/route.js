const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");

const {
    handlerSendMessage,
    handlerGetMessage
  } = require("./handler");
const router = Express.Router();

router.get("/", authenticationToken, handlerGetMessage);
router.post("/", authenticationToken, handlerSendMessage);

module.exports = router;
