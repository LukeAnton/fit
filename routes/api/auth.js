const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");

//@route    GET api/auth
//@desc     Test route
//@access   Public
//adding middleware using auth -- Nice!
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(500).send("Server Error");
  }
});

//@route    POST api/auth
//@desc     Authenticate User & get
//@access   Public

router.post(
  "/",
  //validations
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "password is required").exists()
  ],
  //body
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

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
        password
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
