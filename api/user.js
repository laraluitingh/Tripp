const express = require("express");
const router = express.Router();

const User = require("./../models/User");

const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  console.log(req.body);
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
      Message: "Password is too short",
    });
  } else {
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "Failed",
            Message: "Email already exists",
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
                    Message: "Sign up completed",
                    data: result,
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
                Message: "Error occured while hashing password",
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
  console.log(req.body);
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (email == +"" || password === "") {
    res.json({
      status: "Failed",
      Message: "Input field is empty",
    });
  } else {
    User.find({ email }).then((data) => {
      if (data.length) {
        const hashedPassword = data[0].password;
        bcrypt
          .compare(password, hashedPassword)
          .then((result) => {
            if (result) {
              res.json({
                status: "Success",
                Message: "Signin Succesful",
                data: data,
              });

              req.session.user_ID= data["_id"];


            } else {
              res.json({
                status: "Failed",
                Message: "Incorrect Password",
                data: data,
              });
            }
          })
          .catch((err) => {
            console.log(err);
            res.json({
              status: "Failed",
              Message: "Error occurred while comparing passwords",
            });
          });
      } else {
        res.json({
          status: "Failed",
          Message: "Invalid login credentials provided",
        });
      }
    }).catch(err=>{
        res.json({
            status: "Failed",
            Message: "Error occured while checking for existing user",
          });


    });
  }
});

module.exports = router;
