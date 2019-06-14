const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const autht = require("../../middleware/authtrainer");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const Trainer = require("../../models/Trainer");

// @route    GET api/autht
// @desc     Test route
// @access   Public
router.get("/", autht, async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.trainer.id).select("-password");
    res.json(trainer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/autht
// @desc     Authenticate trainer & get token
// @access   Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let trainer = await Trainer.findOne({ email });
      //here
      if (!trainer) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //here
      const isMatch = await bcrypt.compare(password, trainer.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        trainer: {
          id: trainer.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
