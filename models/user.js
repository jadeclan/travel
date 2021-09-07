const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
});

// Encrypt password before doc saved to db using the mongoose pre hook.
userSchema.pre('save', async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
});

// Static method to login user
userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if ( user) {
    // Note password is in plain text and user.password is encrypted.
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  } 
  throw Error('incorrect email');
}

// model is the singular of the collection
const User = mongoose.model('user', userSchema);

module.exports = User;