const mongoose = require("mongoose");

const passportLocalMongoose = require("passport-local-mongoose");


const UserSchema = new mongoose.Schema({
    
    username:{type:String},
    firstName: String,
    lastName: String,
    // active: Boolean,
    // isAdmin: Boolean
   
    //Note: given no data this process auto creates username and password
});

const options = {
    usernameField : "email"
};


//adds passportLocalMongoose plugin to schema
//makes buidling username and password with passport alot easier( less code)
UserSchema.plugin(passportLocalMongoose,options);

//make schema into a model and export it so it can be used in other files
const User = mongoose.model("User", UserSchema);

module.exports = User;