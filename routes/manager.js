const express = require('express');
const router = express.Router();
const passport = require("passport");

const {isUserAuthenticated,isUserAccountActive} = require("../other/userAuth");
const User = require('../models/userModel');

router.use(isUserAuthenticated,isUserAccountActive);


router.get("/",(req,res)=>{
    res.render("manager/home");
});








module.exports = router;