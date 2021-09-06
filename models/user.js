const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

//Create schema and model
const UserSchema = new Schema({
  name: {
    type: String,
    required: 'Username is required',
    unique: true
  },
  email: {
    type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  mailingAddress: String
});

const Destination = mongoose.model('destination', DestinationSchema);

module.exports = Destination;