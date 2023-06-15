const Express = require("express");
const authenticationToken = require("../../middleware/authenticationToken");

const {
    handlerGetConversation,
    handlerCreateConversation,
    handlerDeleteConversation,
    handlerSendChat,
    handlerGetChat
  } = require("./handler");
const router = Express.Router();

router.get("/", authenticationToken, handlerGetConversation);
router.post("/", authenticationToken, handlerCreateConversation);
router.delete("/:id", authenticationToken, handlerDeleteConversation);
router.get("/chat/:id", authenticationToken, handlerGetChat);
router.post("/chat/:id", authenticationToken, handlerSendChat);

module.exports = router;
