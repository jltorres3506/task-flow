const express = require('express');
const router = express.Router();
const passport = require("passport");

const User = require('../models/userModel');
const isRegisterDataValid = require('../other/validations.js');


router.route("/login")
    .get((req,res)=>{
        res.render("auth/login");
    })  
    
    .post((req,res,next)=>{
        next();
    },passport.authenticate("local",{
        successRedirect: "/auth/pass",
        failureRedirect:"/auth/fail"

    }));



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
               
               //check to see if email already in system
                User.findOne({email:data.email},(error,foundUser)=>{

                    if(foundUser){
                        data.validationError = "Sorry but there is an active account with that email!";
                        res.render("auth/register",data);
                    }else{


                        data.active = false;
                        data.isAdmin = false;

                        // create a new user object
                        const newUser  = new User (data);
                        
                        //register new user
                        User.register(newUser, data.password,(error,user)=>{
                          
                         
                            res.render("auth/login",{msg: "You have succesfuly created an account please login using your creds!"});
                        
                        });

                    }
                });
              
            }
          
        });

    });


router.get("/pass",(req,res)=>{
    res.render("pass");
});

router.get("/fail",(req,res)=>{
    res.render("fail");
});
    module.exports = router;