const Express = require("express");
const {
    handlerSendChat,
    handlerGetChat,
  } = require("./handler");
const router = Express.Router();

router.post("/", handlerSendChat);
router.get("/", handlerGetChat);

module.exports = router;
