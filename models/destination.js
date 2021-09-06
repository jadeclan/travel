const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Create schema and model
const DestinationSchema = new Schema({
  name: String //, airport: Boolean, area: Number, population: Number
});

const Destination = mongoose.model('destination', DestinationSchema);

module.exports = Destination;