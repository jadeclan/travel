const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireAuth = (req, res, next)=>{
  const token = req.cookies.jwt;

  // Check json exists and is verified
  if(token){
    // Secret string must be the same as in controllers/authController.js
    jwt.verify(token, 'secret string', (err, decodedToken) => {
      if(err){
        console.log(err.message);
        res.redirect('/login');
      }
      else {
        next();
      }
    })
  }
  else {
    res.redirect('/login');
  }
}

// check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'secret string', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;// user didn't exist
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        //Pass the user object into the view        
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null; // user not logged in
    next();
  }
};

module.exports = { requireAuth, checkUser };