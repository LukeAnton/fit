const express = require("express");
const router = express.Router();

//@route    GET api/trainers
//@desc     Test route
//@access   Public
router.get("/", (req, res) => res.send("trainer route"));

module.exports = router;
