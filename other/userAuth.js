// checks if user is authticated for this whole route
const isUserAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
      } else {
      res.redirect("/auth/login");
    }
  };
  
  //checks to see if user account is active
const isUserAccountActive = (req,res,next)=>{
    if(req.user.active){
      next();
    }else{
        res.redirect("/auth/login");
    }
  };

  module.exports ={
      isUserAuthenticated,
      isUserAccountActive
  };