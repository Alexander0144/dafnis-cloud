const router = require("express").Router();

router.post("/authenticate", (req, res) => {
  try {
    res.status(200).json({ status: "unimplemented" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", (req, res) => {
  try {
    res.status(200).json({ status: "unimplemented" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
