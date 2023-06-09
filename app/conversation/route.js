const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");

const {
    handlerGetConversation,
    handlerCreateConversation,
    handlerSendChat,
    handlerGetChat
  } = require("./handler");
const router = Express.Router();

router.get("/", authenticationToken, handlerGetConversation);
router.post("/", authenticationToken, handlerCreateConversation);
router.get("/chat/:id", authenticationToken, handlerGetChat);
router.post("/chat/:id", authenticationToken, handlerSendChat);

module.exports = router;
