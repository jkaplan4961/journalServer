// let express = require('express');
// let router = express.Router();
// let sequelize = require('../db');
// let User = sequelize.import("../models/user.js");


const router = require("express").Router();
const User = require("../db").import("../models/user.js")
const jwt = require("jsonwebtoken");
// Create a new endpoint : /create
// The endpoint is a post request
// have an object that matches the model of the userTable (email/Password
// Let sequelize create a new record in database (create))

router.post('/create', function(req, res) {
    let userModel = {
        email: req.body.user.email,
        password: req.body.user.password,
    };
    User.create(userModel).then(function(user) {
        let token =jwt.sign({id: user.id, email: user.email}, "i_am_secret", {expiresIn: 60 * 60 * 24 });
        let responseObject = {
            user: user,
            message: "User successfully created",
            sessionToken: token,
        };
        res.json(responseObject);
    })
    .catch(function(err){
        res.status(500).json({error: err});
    })
});

router.post("/login", function (req, res) {
    User.findOne({ where: { email: req.body.user.email } }).then(function loginSuccess(user) {
       if(user){
           res.status(200).json({user: user });
       } else {
        res.send("User not found");
       }
    }
    ) .catch(function (err) {
        res.status(500).json({ error: err });
    });
});
module.exports = router;