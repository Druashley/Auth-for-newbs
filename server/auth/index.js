const express = require("express");
const Joi = require("joi");

const db = require("../db/connection.js");

const users = db.get("users");

users.createIndex("username", { unique: true });

const router = express.Router();

const schema = Joi.object().keys({
  username: Joi.string()
    .regex(/([a-zA-Z0-9_]*$)/)
    .min(2)
    .max(30)
    .required(),
  password: Joi.string().min(6).required(),
});

router.get("/", (req, res) => {
  res.json({
    message: "Locked",
  });
});

router.post("/signup", (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error === null) {
    users
      .findOne({
        username: req.body.username,
      })
      .then((user) => {
        // if user is undefined, then username does not exist
        res.json({ user });
      });
  } else {
    next(result.error);
  }
});

module.exports = router;
