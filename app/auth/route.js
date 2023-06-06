const Express = require("express");
const {
    handlerSignIn,
    handlerSignUp,
    handlerTes,
  } = require("./handler");
const router = Express.Router();

router.get("/", handlerTes);
router.post("/signin", handlerSignIn);
router.post("/signup", handlerSignUp);

module.exports = router;