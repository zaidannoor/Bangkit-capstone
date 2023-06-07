const Express = require("express");
const {
    handlerSignIn,
    handlerSignUp,
  } = require("./handler");
const router = Express.Router();

router.post("/signin", handlerSignIn);
router.post("/signup", handlerSignUp);

module.exports = router;