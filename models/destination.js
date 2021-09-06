const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create schema and model
const PictureSchema = new Schema({
  title: String, 
  fileName: String,
  description: String,
  source: String,
  timesClicked: Number 
});

const DestinationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }, 
  airport: Boolean, 
  area: Number, 
  population: Number,
  pictures: [PictureSchema],
  pageVisits: Number
});

const Destination = mongoose.model('destination', DestinationSchema);

module.exports = Destination;