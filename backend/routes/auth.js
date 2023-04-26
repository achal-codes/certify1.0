const express = require('express');
//Importing express validator
const { check } = require('express-validator');
const router = express.Router();

// importing methods from controllers/auth.js
const {signout, signup, signin, isSignedIn} = require("../controllers/auth.js");

// Creating a post request
router.post("/signup",
//Adding an array of checks as a middleware
[
    //Name check
    check("name")
    .isLength({min: 5})
    .withMessage("Must be greater than 5 characters"),
    //Email check
    check("email")
    .isEmail()
    .withMessage("Enter a valid email id"),
    //Password check
    check("password")
    .isLength({min: 8})
    .withMessage("Password should be atleast 8 characters")
    .matches(/\d/)
    .withMessage("Must contain a number"),
], signup);

//Creating sign in route by a post request
router.post("/signin",
[
    //Email check
    check("email")
    .isEmail()
    .withMessage("Enter a valid email id"),
    //Password check
    check("password")
    .isLength({min: 8})
    .withMessage("Password should be atleast 8 characters")
    .matches(/\d/)
    .withMessage("Must contain a number"),
], 
signin);

router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res)=>{
    res.send("Protected Route !!");
});

module.exports = router;