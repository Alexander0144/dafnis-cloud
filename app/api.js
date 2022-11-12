const router = require("express").Router();
const sessionRouter = require("./routes/sessionRouter");

router.use("/session", sessionRouter);

module.exports = router;
