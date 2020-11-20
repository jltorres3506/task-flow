const express = require('express');
const router = express.Router();

const User = require('../models/userModel');
const isRegisterDataValid = require('../other/validations.js');




router.route("/login")
    .get((req,res)=>{
        res.render("auth/login");
    })  
    
    .post((req,res)=>{
        console.log("login submitted");
    });



router.route("/register")

    .get((req,res)=>{
        res.render("auth/register");
    })

    .post((req,res)=>{

        isRegisterDataValid(req.body,(error,data)=>{

            if(error){
                //add error data object, so it can be seen when view is rendered
                data.validationError = error.message;

                // render register form with user data along with validation error
                res.render("auth/register",data);
                
            }else{
                // create a new user object
                const newUser  = new User (data);
                
                //register new user
                User.register(newUser, data.password,(error,user)=>{
                  
                    res.render("auth/login",{msg: "You have succesfuly created an account please login using your creds!"});
                   
                });
            }
          
        });

    });
module.exports = router;