const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

//@route    POST api/users
//@desc     Register user
//@access   Public

router.post(
  "/",
  //validations
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
  //body
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //this avoids using req.body.whatever
    const { name, email, password, geometry } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      const avatar = gravatar.url(email, {
        s: "200",
        r: "x",
        d: "identicon"
      });
      //creating instance of a user
      user = new User({
        name,
        email,
        avatar,
        password,
        geometry
      });
      //hash the password
      const salt = await bcrypt.genSalt(10);
      user.passwort = await bcrypt.hash(password, salt);
      await user.save();
      //get payload -- JWT THING
      const payload = {
        user: {
          id: user.id
        }
      };
      //sign payload -- JWT THING
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      // res.send(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
