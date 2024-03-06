const { Validator } = require("node-input-validator");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const EXPIRE_TIME = 12 * 60 * 60 * 1000;

exports.register = async (req, res) => {
  const v = new Validator(req.body, {
    username: "required",
    password: "required",
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).send(v.errors);
  }

  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(422).send({ message: "Username already exists" });
    }

    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });

    let userData = await newUser.save();

    return res.status(201).send({
      message: "User Registered Successfully!",
      data: userData,
      status: "success",
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      data: error,
    });
  }
};

exports.login = async (req, res) => {
  const v = new Validator(req.body, {
    username: "required",
    password: "required",
  });

  const matched = await v.check();

  if (!matched) {
    return res.status(422).send(v.errors);
  }

  try {
    let userData = await User.findOne({ username: req.body.username });

    if (userData) {
      if (bcryptjs.compareSync(req.body.password, userData.password)) {
        let jwt_secret = process.env.JWT_SECRET || "mysecret";
        let token = jwt.sign(
          {
            data: {
              _id: userData._id,
              username: userData.username,
            },
          },
          jwt_secret,
          { expiresIn: "12h" }
        );

        userData = userData.toObject();

        delete userData.password;

        userData.accessToken = token;

        userData.expiresIn = new Date().setTime(new Date().getTime() + EXPIRE_TIME);

        return res.status(200).send({
          message: "User Logged in Successfully!",
          data: userData,
          status: "success",
        });
      } else {
        return res.status(400).send({
          message: "Incorrect credentials!",
          data: {},
        });
      }
    } else {
      return res.status(400).send({
        message: "User is not registered",
        data: {},
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      data: error,
    });
  }
};
