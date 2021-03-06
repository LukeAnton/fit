const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const Trainer = require("../../models/Trainer");

//@route    POST api/trainers
//@desc     Register trainer
//@access   Public

router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, skills, geometry } = req.body;

    try {
      let trainer = await Trainer.findOne({ email });

      if (trainer) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Trainer already exists" }] });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      trainer = new Trainer({
        name,
        email,
        avatar,
        password,
        geometry
      });

      const salt = await bcrypt.genSalt(10);

      trainer.password = await bcrypt.hash(password, salt);

      await trainer.save();

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
