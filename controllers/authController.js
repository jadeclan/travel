const User = require('../models/user');
const jwt = require('jsonwebtoken');

//handle errors
const handleErrors = (err) => {
  let errors = { email: '', password: '' };

  // Email address not in the data base
  if (err.message === 'incorrect email'){
    errors.email = 'That email is not registered!';
  }

 // Incorrect password
 if (err.message === 'incorrect password'){
  errors.password = 'You entered the wrong password!';
}  

  // A Duplicate email error code from Mongoose
  if ( err.code === 11000 ) { 
    errors.email = "That email address is already registered"
    return errors;
   }

  // validation errors
  if(err.message.includes('user validation failed')){
    Object.values(err.errors).forEach(({properties}) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
}

// Set how long the cookie will persist for.
const maxAge = 3 * 24 * 60 * 60; // In seconds

const createToken = (id)=> {
  // Secret string must be the same as in middleware/authMiddleware.js
  return jwt.sign({ id }, 'secret string', {expiresIn: maxAge });
}

module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.create({email, password});
    //Return a cookie named JWT that is created with the user ID
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
    res.status(201).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
    res.status(200).json({ user: user._id });
  } 
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
}

module.exports.logout_get = (req, res) => {
  //overwrite the existing cookie with a null one that expires very quickly
  res.cookie('jwt', '', { maxAge: 1 });  // expires in 1 millisecond
  res.redirect('/');
}