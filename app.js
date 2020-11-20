
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const app = express();

const auth = require(__dirname+"/routes/auth.js");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");



app.use(session({
    
    secret:"my secret stuff",
    resave: false,
    saveUninitialized:false,
    cookie:{ maxAge: 24 * 60 * 60 * 1000 }
  
  }));
  
  
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  //this model is needed because of line B1, B2, B3, for creating the type of strategy
  const User = require(__dirname+"/models/userModel.js");
  
  passport.use(User.createStrategy());//B1
  passport.serializeUser(User.serializeUser());//B2
  passport.deserializeUser(User.deserializeUser());//B3




app.use("/auth",auth);



// mongoose.connect("mongodb+srv://jose-admin:Free3506@cluster0-pq6rw.mongodb.net/lockerDB", {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false});
// mongoose.connect("mongodb+srv://jtorres:Testing101797@cluster0.g6qja.mongodb.net/lockerCmsFake",{useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify: false})
mongoose.connect('mongodb://localhost:27017/taskFlowDb', {useNewUrlParser: true, useUnifiedTopology:true,useFindAndModify: false});
mongoose.set("useCreateIndex",true);



app.all("*",(req,res)=>{
//   res.redirect("/");
res.send("trying to reach a page that does not exitst");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
