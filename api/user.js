const express = require("express");
const router = express.Router();

const User = require("./../models/User");

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId=mongoose.ObjectId

router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();

  if ((name === "" || email === "", password === "")) {
    res.json({
      status: "Failed",
      message: "Empty Input Fields",
    });
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    res.json({
      status: "Failed",
      Message: "Invalid Email entered",
    });
  } else if (password.length < 8) {
    res.json({
      status: "Failed",
      message: "Password is too short",
    });
  } else {
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "Failed",
            message: "Email already exists",
          });
        } else {
          bcrypt
            .hash(password, 10)
            .then((hashPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashPassword,
              });

              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "Success",
                    message: "Sign up completed",
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);

              res.json({
                status: "Failed",
                message: "Error occured while hashing password",
              });
            });
        }
      })
      .catch((err) => {
        console.log(err);

        res.json({
          status: "Failed",
          Message: "An error occured while checking for existing user!!",
        });
      });
  }
});

router.post("/signin", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == +"" || password === "") {
    res.json({
      status: "Failed",
      message: "Input field is empty",
    });
  } else {
    User.find({ email })
      .then((data) => {
        if (data.length) {
          const hashedPassword = data[0].password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                req.session.userId = data[0]._id.toString();
                res.json({
                  status: "Success",
                  message: "Signin Succesful",
                });
              } else {
                res.json({
                  status: "Failed",
                  message: "Incorrect Password",
                });
              }
            })
            .catch((err) => {
              console.log(err);
              res.json({
                status: "Failed",
                message: "Error occurred while comparing passwords",
              });
            });
        } else {
          res.json({
            status: "Failed",
            Message: "Invalid login credentials provided",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "Failed",
          Message: "Error occured while checking for existing user",
        });
      });
  }
});

router.get("/session", (req, res) => {
  if (req.session.userId) {
    res.status(200).send();
  } else {
    res.status(401).send();
  }
});

router.get("/information", (req, res) => {
  const email = req.session.userId;
  User.find({ _id: mongoose.Types.ObjectId(email) }).then((data) => {
    res.json({
      information: data,
    });
  });
});

router.delete("/", (req, res) => {
  req.session.destroy();
  res.status(200).send();
});

router.post("/update", (req, res) => {
  let { name, bio, img } = req.body;
  name = name.trim();
  const userId = req.session.userId;

  if (name === "") {
    res.json({
      status: "Failed",
      message: "Empty Input Fields",
    });
  } else if (bio.length > 400){
    res.json({
      status: "Failed",
      message: "Bio is too long",
    });
  } else {
          User.updateOne(
              { _id: mongoose.Types.ObjectId(userId)},
              { $set: { "name":name, "bio":bio, "img": img } }
            )
            .then(() => {
              res.json({
                status: "Success",
                message: "Sign up completed",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
});

module.exports = router;
