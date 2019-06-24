const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/authtrainer");
const { check, validationResult } = require("express-validator/check");
const TrainerProfile = require("../../models/TrainerProfile");
const Trainer = require("../../models/Trainer");

// @route    GET api/trainerprofile/me
// @desc     Get current trainers trainertrainerprofile
// @access   Private
router.get("/tme", auth, async (req, res) => {
  try {
    const trainerprofile = await TrainerProfile.findOne({
      trainer: req.trainer.id
    }).populate("trainer", ["name", "avatar"]);

    if (!trainerprofile) {
      return res
        .status(400)
        .json({ msg: "There is no trainer trainerprofile for this trainer" });
    }

    res.json(trainerprofile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/trainerprofile
// @desc     Create or update trainer trainerprofile
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("skills", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      location,
      skills,
      bio,
      twitter,
      facebook,
      linkedin,
      instagram
    } = req.body;

    //Build trainerprofile object
    const trainerProfileFields = {};
    trainerProfileFields.trainer = req.trainer.id;
    if (location) trainerProfileFields.location = location;
    if (bio) trainerProfileFields.bio = bio;
    if (skills) {
      trainerProfileFields.skills = skills
        .split(",")
        .map(skill => skill.trim());
    }

    trainerProfileFields.social = {};
    if (twitter) trainerProfileFields.social.twitter = twitter;
    if (facebook) trainerProfileFields.social.facebook = facebook;
    if (linkedin) trainerProfileFields.social.linkedin = linkedin;
    if (instagram) trainerProfileFields.social.instagram = instagram;

    try {
      let trainerprofile = await TrainerProfile.findOne({
        trainer: req.trainer.id
      });
      if (trainerprofile) {
        trainerprofile = await TrainerProfile.findOneAndUpdate(
          { trainer: req.trainer.id },
          { $set: trainerProfileFields },
          { new: true }
        );
        return res.json(trainerprofile);
      }

      trainerprofile = new TrainerProfile(trainerProfileFields);

      await trainerprofile.save();
      res.json(trainerprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);
// @route    POST api/trainerprofile
// @desc     GET all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const trainerprofiles = await TrainerProfile.find().populate("trainer", [
      "name",
      "avatar"
    ]);
    res.json(trainerprofiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
